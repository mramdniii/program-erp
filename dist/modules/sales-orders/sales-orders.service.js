"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sales_order_entity_1 = require("./sales-order.entity");
const sale_detail_entity_1 = require("./sale-detail.entity");
const stock_list_entity_1 = require("../stock-list/stock-list.entity");
const godown_diary_entity_1 = require("../godown-diary/godown-diary.entity");
let SalesOrdersService = class SalesOrdersService {
    constructor(salesOrderRepo, saleDetailRepo, stockListRepo, godownDiaryRepo, dataSource) {
        this.salesOrderRepo = salesOrderRepo;
        this.saleDetailRepo = saleDetailRepo;
        this.stockListRepo = stockListRepo;
        this.godownDiaryRepo = godownDiaryRepo;
        this.dataSource = dataSource;
    }
    async generatedOrderNo() {
        const count = await this.saleDetailRepo.count();
        const number = (count + 1).toString().padStart(4, "0");
        return `SO-${number}`;
    }
    async findAll() {
        return this.salesOrderRepo.find({
            relations: ['customerRel', 'details', 'details.productRel'],
            order: { id: 'DESC' },
        });
    }
    async findOne(id) {
        const order = await this.salesOrderRepo.findOne({
            where: { id },
            relations: ['customerRel', 'details', 'details.productRel'],
        });
        if (!order)
            throw new common_1.NotFoundException(`Sales Order ${id} not found`);
        return order;
    }
    async create(data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const orderNo = await this.generatedOrderNo();
            const order = this.salesOrderRepo.create({
                orderNo,
                orderDate: data.orderDate,
                customers: data.customers,
                notes: data.notes,
                totalAmount: 0,
            });
            await queryRunner.manager.save(order);
            let totalAmount = 0;
            for (const detail of data.details || []) {
                const stock = await queryRunner.manager.findOne(stock_list_entity_1.StockList, { where: { products: detail.products } });
                if (!stock || Number(stock.qty) < Number(detail.qty)) {
                    throw new common_1.BadRequestException(`Insufficient stock for product ID ${detail.products}`);
                }
                const amount = detail.qty * detail.price;
                totalAmount += amount;
                const saleDetail = this.saleDetailRepo.create({
                    salesOrders: order.id,
                    products: detail.products,
                    qty: detail.qty,
                    price: detail.price,
                    amount: amount,
                });
                await queryRunner.manager.save(saleDetail);
                await this.updateStock(queryRunner, detail.products, detail.qty, 'SUBTRACT');
                await queryRunner.manager.save(this.godownDiaryRepo.create({
                    transDate: order.orderDate,
                    transType: 'SALES',
                    transRef: order.orderNo,
                    products: detail.products,
                    godown: data.godown || 'Main Warehouse',
                    qtyIn: 0,
                    qtyOut: detail.qty,
                    notes: `Sales Order: ${order.orderNo}`,
                }));
            }
            order.totalAmount = totalAmount;
            await queryRunner.manager.save(order);
            await queryRunner.commitTransaction();
            return this.findOne(order.id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async update(id, data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const order = await this.findOne(id);
            for (const detail of order.details) {
                await this.updateStock(queryRunner, detail.products, detail.qty, 'ADD');
            }
            await queryRunner.manager.delete(sale_detail_entity_1.SaleDetail, { salesOrders: id });
            await queryRunner.manager.delete(godown_diary_entity_1.GodownDiary, { transRef: order.orderNo });
            order.orderDate = data.orderDate || order.orderDate;
            order.customers = data.customers || order.customers;
            order.notes = data.notes || order.notes;
            let totalAmount = 0;
            for (const detail of data.details || []) {
                const stock = await queryRunner.manager.findOne(stock_list_entity_1.StockList, { where: { products: detail.products } });
                if (!stock || Number(stock.qty) < Number(detail.qty)) {
                    throw new common_1.BadRequestException(`Insufficient stock for product ID ${detail.products}`);
                }
                const amount = detail.qty * detail.price;
                totalAmount += amount;
                await queryRunner.manager.save(this.saleDetailRepo.create({
                    salesOrders: order.id,
                    products: detail.products,
                    qty: detail.qty,
                    price: detail.price,
                    amount: amount,
                }));
                await this.updateStock(queryRunner, detail.products, detail.qty, 'SUBTRACT');
                await queryRunner.manager.save(this.godownDiaryRepo.create({
                    transDate: order.orderDate,
                    transType: 'SALES',
                    transRef: order.orderNo,
                    products: detail.products,
                    godown: data.godown || 'Main Warehouse',
                    qtyIn: 0,
                    qtyOut: detail.qty,
                }));
            }
            order.totalAmount = totalAmount;
            await queryRunner.manager.save(order);
            await queryRunner.commitTransaction();
            return this.findOne(id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async remove(id) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const order = await this.findOne(id);
            for (const detail of order.details) {
                await this.updateStock(queryRunner, detail.products, detail.qty, 'ADD');
            }
            await queryRunner.manager.delete(godown_diary_entity_1.GodownDiary, { transRef: order.orderNo });
            await queryRunner.manager.remove(order);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateStock(queryRunner, productId, qty, operation) {
        let stock = await queryRunner.manager.findOne(stock_list_entity_1.StockList, { where: { products: productId } });
        if (!stock) {
            stock = this.stockListRepo.create({
                products: productId,
                qty: 0,
            });
        }
        if (operation === 'ADD') {
            stock.qty = Number(stock.qty) + Number(qty);
        }
        else {
            stock.qty = Number(stock.qty) - Number(qty);
        }
        await queryRunner.manager.save(stock);
    }
};
exports.SalesOrdersService = SalesOrdersService;
exports.SalesOrdersService = SalesOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sales_order_entity_1.SalesOrder)),
    __param(1, (0, typeorm_1.InjectRepository)(sale_detail_entity_1.SaleDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(stock_list_entity_1.StockList)),
    __param(3, (0, typeorm_1.InjectRepository)(godown_diary_entity_1.GodownDiary)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], SalesOrdersService);
//# sourceMappingURL=sales-orders.service.js.map
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
exports.PurcOrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const purc_order_entity_1 = require("./purc-order.entity");
const purc_detail_entity_1 = require("./purc-detail.entity");
const stock_list_entity_1 = require("../stock-list/stock-list.entity");
const godown_diary_entity_1 = require("../godown-diary/godown-diary.entity");
let PurcOrdersService = class PurcOrdersService {
    constructor(purcOrderRepo, purcDetailRepo, stockListRepo, godownDiaryRepo, dataSource) {
        this.purcOrderRepo = purcOrderRepo;
        this.purcDetailRepo = purcDetailRepo;
        this.stockListRepo = stockListRepo;
        this.godownDiaryRepo = godownDiaryRepo;
        this.dataSource = dataSource;
    }
    async generatedOrderNo() {
        const count = await this.purcOrderRepo.count();
        const number = (count + 1).toString().padStart(4, "0");
        return `PO-${number}`;
    }
    async findAll() {
        return this.purcOrderRepo.find({
            relations: ['vendorRel', 'details', 'details.productRel'],
            order: { id: 'DESC' },
        });
    }
    async findOne(id) {
        const order = await this.purcOrderRepo.findOne({
            where: { id },
            relations: ['vendorRel', 'details', 'details.productRel'],
        });
        if (!order)
            throw new common_1.NotFoundException(`Purchase Order ${id} not found`);
        return order;
    }
    async create(data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const orderNo = await this.generatedOrderNo();
            const order = this.purcOrderRepo.create({
                orderNo,
                orderDate: data.orderDate,
                vendors: data.vendors,
                notes: data.notes,
                totalAmount: 0,
            });
            await queryRunner.manager.save(order);
            let totalAmount = 0;
            for (const detail of data.details || []) {
                const amount = detail.qty * detail.price;
                totalAmount += amount;
                const purcDetail = this.purcDetailRepo.create({
                    purcOrders: order.id,
                    products: detail.products,
                    qty: detail.qty,
                    price: detail.price,
                    amount: amount,
                });
                await queryRunner.manager.save(purcDetail);
                await this.updateStock(queryRunner, detail.products, detail.qty, 'ADD');
                await queryRunner.manager.save(this.godownDiaryRepo.create({
                    transDate: order.orderDate,
                    transType: 'PURCHASE',
                    transRef: order.orderNo,
                    products: detail.products,
                    godown: data.godown || 'Main Warehouse',
                    qtyIn: detail.qty,
                    qtyOut: 0,
                    notes: `Purchase Order: ${order.orderNo}`,
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
                await this.updateStock(queryRunner, detail.products, detail.qty, 'SUBTRACT');
            }
            await queryRunner.manager.delete(purc_detail_entity_1.PurcDetail, { purcOrders: id });
            await queryRunner.manager.delete(godown_diary_entity_1.GodownDiary, { transRef: order.orderNo });
            order.orderDate = data.orderDate || order.orderDate;
            order.vendors = data.vendors || order.vendors;
            order.notes = data.notes || order.notes;
            let totalAmount = 0;
            for (const detail of data.details || []) {
                const amount = detail.qty * detail.price;
                totalAmount += amount;
                await queryRunner.manager.save(this.purcDetailRepo.create({
                    purcOrders: order.id,
                    products: detail.products,
                    qty: detail.qty,
                    price: detail.price,
                    amount: amount,
                }));
                await this.updateStock(queryRunner, detail.products, detail.qty, 'ADD');
                await queryRunner.manager.save(this.godownDiaryRepo.create({
                    transDate: order.orderDate,
                    transType: 'PURCHASE',
                    transRef: order.orderNo,
                    products: detail.products,
                    godown: data.godown || 'Main Warehouse',
                    qtyIn: detail.qty,
                    qtyOut: 0,
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
                await this.updateStock(queryRunner, detail.products, detail.qty, 'SUBTRACT');
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
exports.PurcOrdersService = PurcOrdersService;
exports.PurcOrdersService = PurcOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(purc_order_entity_1.PurcOrder)),
    __param(1, (0, typeorm_1.InjectRepository)(purc_detail_entity_1.PurcDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(stock_list_entity_1.StockList)),
    __param(3, (0, typeorm_1.InjectRepository)(godown_diary_entity_1.GodownDiary)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], PurcOrdersService);
//# sourceMappingURL=purc-orders.service.js.map
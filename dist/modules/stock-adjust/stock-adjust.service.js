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
exports.StockAdjustService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stock_adjust_entity_1 = require("./stock-adjust.entity");
const stock_list_entity_1 = require("../stock-list/stock-list.entity");
const godown_diary_entity_1 = require("../godown-diary/godown-diary.entity");
let StockAdjustService = class StockAdjustService {
    constructor(repo, stockListRepo, godownDiaryRepo, dataSource) {
        this.repo = repo;
        this.stockListRepo = stockListRepo;
        this.godownDiaryRepo = godownDiaryRepo;
        this.dataSource = dataSource;
    }
    async findAll() {
        return this.repo.find({ relations: ['productRel'], order: { id: 'DESC' } });
    }
    async findOne(id) {
        const adjust = await this.repo.findOne({ where: { id }, relations: ['productRel'] });
        if (!adjust)
            throw new common_1.NotFoundException(`Stock Adjust ${id} not found`);
        return adjust;
    }
    async create(data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const adjust = this.repo.create(data);
            await queryRunner.manager.save(adjust);
            let stock = await queryRunner.manager.findOne(stock_list_entity_1.StockList, { where: { products: data.products } });
            if (!stock) {
                stock = this.stockListRepo.create({ products: data.products, qty: 0 });
            }
            if (data.type === 'IN') {
                stock.qty = Number(stock.qty) + Number(data.qty);
            }
            else {
                stock.qty = Number(stock.qty) - Number(data.qty);
            }
            await queryRunner.manager.save(stock);
            await queryRunner.manager.save(this.godownDiaryRepo.create({
                transDate: data.adjustDate,
                transType: 'ADJUSTMENT',
                transRef: data.adjustNo,
                products: data.products,
                godown: data.godown || 'Main Warehouse',
                qtyIn: data.type === 'IN' ? data.qty : 0,
                qtyOut: data.type === 'OUT' ? data.qty : 0,
                notes: data.notes,
            }));
            await queryRunner.commitTransaction();
            return this.findOne(data.id);
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
            const adjust = await this.findOne(id);
            let stock = await queryRunner.manager.findOne(stock_list_entity_1.StockList, { where: { products: adjust.products } });
            if (stock) {
                if (adjust.type === 'IN') {
                    stock.qty = Number(stock.qty) - Number(adjust.qty);
                }
                else {
                    stock.qty = Number(stock.qty) + Number(adjust.qty);
                }
                await queryRunner.manager.save(stock);
            }
            await queryRunner.manager.delete(godown_diary_entity_1.GodownDiary, { transRef: adjust.adjustNo });
            await queryRunner.manager.remove(adjust);
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
};
exports.StockAdjustService = StockAdjustService;
exports.StockAdjustService = StockAdjustService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stock_adjust_entity_1.StockAdjust)),
    __param(1, (0, typeorm_1.InjectRepository)(stock_list_entity_1.StockList)),
    __param(2, (0, typeorm_1.InjectRepository)(godown_diary_entity_1.GodownDiary)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], StockAdjustService);
//# sourceMappingURL=stock-adjust.service.js.map
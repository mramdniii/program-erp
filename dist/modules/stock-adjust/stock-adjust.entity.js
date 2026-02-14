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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockAdjust = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../products/product.entity");
let StockAdjust = class StockAdjust {
};
exports.StockAdjust = StockAdjust;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StockAdjust.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'adjust_no', length: 50, unique: true }),
    __metadata("design:type", String)
], StockAdjust.prototype, "adjustNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'adjust_date', type: 'date' }),
    __metadata("design:type", Date)
], StockAdjust.prototype, "adjustDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StockAdjust.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], StockAdjust.prototype, "qty", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], StockAdjust.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], StockAdjust.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StockAdjust.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], StockAdjust.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.stockAdjusts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'products' }),
    __metadata("design:type", product_entity_1.Product)
], StockAdjust.prototype, "productRel", void 0);
exports.StockAdjust = StockAdjust = __decorate([
    (0, typeorm_1.Entity)('stockadjust')
], StockAdjust);
//# sourceMappingURL=stock-adjust.entity.js.map
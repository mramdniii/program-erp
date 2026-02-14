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
exports.PurcDetail = void 0;
const typeorm_1 = require("typeorm");
const purc_order_entity_1 = require("./purc-order.entity");
const product_entity_1 = require("../products/product.entity");
let PurcDetail = class PurcDetail {
};
exports.PurcDetail = PurcDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PurcDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'purcOrders' }),
    __metadata("design:type", Number)
], PurcDetail.prototype, "purcOrders", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PurcDetail.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], PurcDetail.prototype, "qty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], PurcDetail.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], PurcDetail.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PurcDetail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PurcDetail.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => purc_order_entity_1.PurcOrder, purcOrder => purcOrder.details, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'purcOrders' }),
    __metadata("design:type", purc_order_entity_1.PurcOrder)
], PurcDetail.prototype, "purcOrderRel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.purcDetails, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'products' }),
    __metadata("design:type", product_entity_1.Product)
], PurcDetail.prototype, "productRel", void 0);
exports.PurcDetail = PurcDetail = __decorate([
    (0, typeorm_1.Entity)('purcdetails')
], PurcDetail);
//# sourceMappingURL=purc-detail.entity.js.map
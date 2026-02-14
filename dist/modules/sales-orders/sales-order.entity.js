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
exports.SalesOrder = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("../customers/customer.entity");
const sale_detail_entity_1 = require("./sale-detail.entity");
let SalesOrder = class SalesOrder {
};
exports.SalesOrder = SalesOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SalesOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_no', length: 50, unique: true }),
    __metadata("design:type", String)
], SalesOrder.prototype, "orderNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_date', type: 'date' }),
    __metadata("design:type", Date)
], SalesOrder.prototype, "orderDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SalesOrder.prototype, "customers", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], SalesOrder.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], SalesOrder.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SalesOrder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], SalesOrder.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, customer => customer.salesOrders),
    (0, typeorm_1.JoinColumn)({ name: 'customers' }),
    __metadata("design:type", customer_entity_1.Customer)
], SalesOrder.prototype, "customerRel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sale_detail_entity_1.SaleDetail, saleDetail => saleDetail.salesOrderRel, { cascade: true }),
    __metadata("design:type", Array)
], SalesOrder.prototype, "details", void 0);
exports.SalesOrder = SalesOrder = __decorate([
    (0, typeorm_1.Entity)('salesorders')
], SalesOrder);
//# sourceMappingURL=sales-order.entity.js.map
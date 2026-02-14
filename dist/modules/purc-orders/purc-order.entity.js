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
exports.PurcOrder = void 0;
const typeorm_1 = require("typeorm");
const vendor_entity_1 = require("../vendors/vendor.entity");
const purc_detail_entity_1 = require("./purc-detail.entity");
let PurcOrder = class PurcOrder {
};
exports.PurcOrder = PurcOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PurcOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_no', length: 50, unique: true }),
    __metadata("design:type", String)
], PurcOrder.prototype, "orderNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_date', type: 'date' }),
    __metadata("design:type", Date)
], PurcOrder.prototype, "orderDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PurcOrder.prototype, "vendors", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PurcOrder.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PurcOrder.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PurcOrder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PurcOrder.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vendor_entity_1.Vendor, vendor => vendor.purcOrders),
    (0, typeorm_1.JoinColumn)({ name: 'vendors' }),
    __metadata("design:type", vendor_entity_1.Vendor)
], PurcOrder.prototype, "vendorRel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => purc_detail_entity_1.PurcDetail, purcdetail => purcdetail.purcOrderRel, { cascade: true }),
    __metadata("design:type", Array)
], PurcOrder.prototype, "details", void 0);
exports.PurcOrder = PurcOrder = __decorate([
    (0, typeorm_1.Entity)('purcorders')
], PurcOrder);
//# sourceMappingURL=purc-order.entity.js.map
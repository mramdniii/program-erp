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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const prod_group_entity_1 = require("../prod-group/prod-group.entity");
const vendor_entity_1 = require("../vendors/vendor.entity");
const purc_detail_entity_1 = require("../purc-orders/purc-detail.entity");
const sale_detail_entity_1 = require("../sales-orders/sale-detail.entity");
const stock_list_entity_1 = require("../stock-list/stock-list.entity");
const stock_adjust_entity_1 = require("../stock-adjust/stock-adjust.entity");
const godown_diary_entity_1 = require("../godown-diary/godown-diary.entity");
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prodGroup', nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "prodGroup", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "vendors", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => prod_group_entity_1.ProdGroup, prodgroup => prodgroup.products),
    (0, typeorm_1.JoinColumn)({ name: 'prodGroup' }),
    __metadata("design:type", prod_group_entity_1.ProdGroup)
], Product.prototype, "prodGroupRel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vendor_entity_1.Vendor, vendor => vendor.products),
    (0, typeorm_1.JoinColumn)({ name: 'vendors' }),
    __metadata("design:type", vendor_entity_1.Vendor)
], Product.prototype, "vendorRel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => purc_detail_entity_1.PurcDetail, purcdetail => purcdetail.productRel),
    __metadata("design:type", Array)
], Product.prototype, "purcDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sale_detail_entity_1.SaleDetail, saledetail => saledetail.productRel),
    __metadata("design:type", Array)
], Product.prototype, "saleDetails", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => stock_list_entity_1.StockList, stocklist => stocklist.productRel),
    __metadata("design:type", stock_list_entity_1.StockList)
], Product.prototype, "stockList", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stock_adjust_entity_1.StockAdjust, stockAdjust => stockAdjust.productRel),
    __metadata("design:type", Array)
], Product.prototype, "stockAdjusts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => godown_diary_entity_1.GodownDiary, godownDiary => godownDiary.productRel),
    __metadata("design:type", Array)
], Product.prototype, "godownDiaries", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products')
], Product);
//# sourceMappingURL=product.entity.js.map
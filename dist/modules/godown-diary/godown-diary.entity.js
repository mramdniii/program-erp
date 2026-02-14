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
exports.GodownDiary = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../products/product.entity");
let GodownDiary = class GodownDiary {
};
exports.GodownDiary = GodownDiary;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GodownDiary.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'trans_date', type: 'date' }),
    __metadata("design:type", Date)
], GodownDiary.prototype, "transDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'trans_type', length: 20 }),
    __metadata("design:type", String)
], GodownDiary.prototype, "transType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'trans_ref', length: 50, nullable: true }),
    __metadata("design:type", String)
], GodownDiary.prototype, "transRef", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], GodownDiary.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], GodownDiary.prototype, "godown", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'qty_in', type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], GodownDiary.prototype, "qtyIn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'qty_out', type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], GodownDiary.prototype, "qtyOut", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], GodownDiary.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], GodownDiary.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.godownDiaries, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'products' }),
    __metadata("design:type", product_entity_1.Product)
], GodownDiary.prototype, "productRel", void 0);
exports.GodownDiary = GodownDiary = __decorate([
    (0, typeorm_1.Entity)('godowndiary')
], GodownDiary);
//# sourceMappingURL=godown-diary.entity.js.map
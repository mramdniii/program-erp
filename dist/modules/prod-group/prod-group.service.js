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
exports.ProdGroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const prod_group_entity_1 = require("./prod-group.entity");
let ProdGroupService = class ProdGroupService {
    constructor(prodGroupRepository) {
        this.prodGroupRepository = prodGroupRepository;
    }
    findAll() {
        return this.prodGroupRepository.find({ order: { id: 'DESC' } });
    }
    async findOne(id) {
        const prodGroup = await this.prodGroupRepository.findOne({ where: { id } });
        if (!prodGroup) {
            throw new common_1.NotFoundException(`ProdGroup with ID ${id} not found`);
        }
        return prodGroup;
    }
    create(data) {
        const prodGroup = this.prodGroupRepository.create(data);
        return this.prodGroupRepository.save(prodGroup);
    }
    async update(id, data) {
        const prodGroup = await this.findOne(id);
        Object.assign(prodGroup, data);
        return this.prodGroupRepository.save(prodGroup);
    }
    async remove(id) {
        const prodGroup = await this.findOne(id);
        await this.prodGroupRepository.remove(prodGroup);
    }
};
exports.ProdGroupService = ProdGroupService;
exports.ProdGroupService = ProdGroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prod_group_entity_1.ProdGroup)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProdGroupService);
//# sourceMappingURL=prod-group.service.js.map
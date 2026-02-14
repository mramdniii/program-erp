"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdGroupModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const prod_group_controller_1 = require("./prod-group.controller");
const prod_group_service_1 = require("./prod-group.service");
const prod_group_entity_1 = require("./prod-group.entity");
let ProdGroupModule = class ProdGroupModule {
};
exports.ProdGroupModule = ProdGroupModule;
exports.ProdGroupModule = ProdGroupModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([prod_group_entity_1.ProdGroup])],
        controllers: [prod_group_controller_1.ProdGroupController],
        providers: [prod_group_service_1.ProdGroupService],
        exports: [prod_group_service_1.ProdGroupService],
    })
], ProdGroupModule);
//# sourceMappingURL=prod-group.module.js.map
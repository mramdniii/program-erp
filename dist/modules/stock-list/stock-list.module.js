"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockListModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const stock_list_controller_1 = require("./stock-list.controller");
const stock_list_service_1 = require("./stock-list.service");
const stock_list_entity_1 = require("./stock-list.entity");
let StockListModule = class StockListModule {
};
exports.StockListModule = StockListModule;
exports.StockListModule = StockListModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([stock_list_entity_1.StockList])],
        controllers: [stock_list_controller_1.StockListController],
        providers: [stock_list_service_1.StockListService],
        exports: [stock_list_service_1.StockListService],
    })
], StockListModule);
//# sourceMappingURL=stock-list.module.js.map
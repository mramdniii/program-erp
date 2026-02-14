"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockAdjustModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const stock_adjust_controller_1 = require("./stock-adjust.controller");
const stock_adjust_service_1 = require("./stock-adjust.service");
const stock_adjust_entity_1 = require("./stock-adjust.entity");
const stock_list_entity_1 = require("../stock-list/stock-list.entity");
const godown_diary_entity_1 = require("../godown-diary/godown-diary.entity");
let StockAdjustModule = class StockAdjustModule {
};
exports.StockAdjustModule = StockAdjustModule;
exports.StockAdjustModule = StockAdjustModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([stock_adjust_entity_1.StockAdjust, stock_list_entity_1.StockList, godown_diary_entity_1.GodownDiary])],
        controllers: [stock_adjust_controller_1.StockAdjustController],
        providers: [stock_adjust_service_1.StockAdjustService],
        exports: [stock_adjust_service_1.StockAdjustService],
    })
], StockAdjustModule);
//# sourceMappingURL=stock-adjust.module.js.map
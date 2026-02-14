"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurcOrdersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const purc_orders_controller_1 = require("./purc-orders.controller");
const purc_orders_service_1 = require("./purc-orders.service");
const purc_order_entity_1 = require("./purc-order.entity");
const purc_detail_entity_1 = require("./purc-detail.entity");
const stock_list_entity_1 = require("../stock-list/stock-list.entity");
const godown_diary_entity_1 = require("../godown-diary/godown-diary.entity");
let PurcOrdersModule = class PurcOrdersModule {
};
exports.PurcOrdersModule = PurcOrdersModule;
exports.PurcOrdersModule = PurcOrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([purc_order_entity_1.PurcOrder, purc_detail_entity_1.PurcDetail, stock_list_entity_1.StockList, godown_diary_entity_1.GodownDiary])],
        controllers: [purc_orders_controller_1.PurcOrdersController],
        providers: [purc_orders_service_1.PurcOrdersService],
        exports: [purc_orders_service_1.PurcOrdersService],
    })
], PurcOrdersModule);
//# sourceMappingURL=purc-orders.module.js.map
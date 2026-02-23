"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const prod_group_module_1 = require("./modules/prod-group/prod-group.module");
const vendors_module_1 = require("./modules/vendors/vendors.module");
const customers_module_1 = require("./modules/customers/customers.module");
const products_module_1 = require("./modules/products/products.module");
const purc_orders_module_1 = require("./modules/purc-orders/purc-orders.module");
const sales_orders_module_1 = require("./modules/sales-orders/sales-orders.module");
const stock_list_module_1 = require("./modules/stock-list/stock-list.module");
const stock_adjust_module_1 = require("./modules/stock-adjust/stock-adjust.module");
const godown_diary_module_1 = require("./modules/godown-diary/godown-diary.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                logging: true,
                ssl: {
                    rejectUnauthorized: false,
                },
            }),
            prod_group_module_1.ProdGroupModule,
            vendors_module_1.VendorsModule,
            customers_module_1.CustomersModule,
            products_module_1.ProductsModule,
            purc_orders_module_1.PurcOrdersModule,
            sales_orders_module_1.SalesOrdersModule,
            stock_list_module_1.StockListModule,
            stock_adjust_module_1.StockAdjustModule,
            godown_diary_module_1.GodownDiaryModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
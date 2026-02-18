import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProdGroupModule } from './modules/prod-group/prod-group.module';
import { VendorsModule } from './modules/vendors/vendors.module';
import { CustomersModule } from './modules/customers/customers.module';
import { ProductsModule } from './modules/products/products.module';
import { PurcOrdersModule } from './modules/purc-orders/purc-orders.module';
import { SalesOrdersModule } from './modules/sales-orders/sales-orders.module';
import { StockListModule } from './modules/stock-list/stock-list.module';
import { StockAdjustModule } from './modules/stock-adjust/stock-adjust.module';
import { GodownDiaryModule } from './modules/godown-diary/godown-diary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    /*TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'stock_management',
      entities: [__dirname + '/**/ //*.entity{.ts,.js}'],
      /*synchronize: false, // Set to false in production
      logging: true,
    }), */

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),

    ProdGroupModule,
    VendorsModule,
    CustomersModule,
    ProductsModule,
    PurcOrdersModule,
    SalesOrdersModule,
    StockListModule,
    StockAdjustModule,
    GodownDiaryModule,
  ],
})
export class AppModule {}

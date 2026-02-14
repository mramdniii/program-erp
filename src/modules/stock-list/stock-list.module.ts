import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockListController } from './stock-list.controller';
import { StockListService } from './stock-list.service';
import { StockList } from './stock-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockList])],
  controllers: [StockListController],
  providers: [StockListService],
  exports: [StockListService],
})
export class StockListModule {}

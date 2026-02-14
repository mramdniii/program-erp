import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurcOrdersController } from './purc-orders.controller';
import { PurcOrdersService } from './purc-orders.service';
import { PurcOrder } from './purc-order.entity';
import { PurcDetail } from './purc-detail.entity';
import { StockList } from '../stock-list/stock-list.entity';
import { GodownDiary } from '../godown-diary/godown-diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurcOrder, PurcDetail, StockList, GodownDiary])],
  controllers: [PurcOrdersController],
  providers: [PurcOrdersService],
  exports: [PurcOrdersService],
})
export class PurcOrdersModule {}

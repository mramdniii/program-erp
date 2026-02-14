import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockAdjustController } from './stock-adjust.controller';
import { StockAdjustService } from './stock-adjust.service';
import { StockAdjust } from './stock-adjust.entity';
import { StockList } from '../stock-list/stock-list.entity';
import { GodownDiary } from '../godown-diary/godown-diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockAdjust, StockList, GodownDiary])],
  controllers: [StockAdjustController],
  providers: [StockAdjustService],
  exports: [StockAdjustService],
})
export class StockAdjustModule {}

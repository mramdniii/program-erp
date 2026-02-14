import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GodownDiaryController } from './godown-diary.controller';
import { GodownDiaryService } from './godown-diary.service';
import { GodownDiary } from './godown-diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GodownDiary])],
  controllers: [GodownDiaryController],
  providers: [GodownDiaryService],
  exports: [GodownDiaryService],
})
export class GodownDiaryModule {}

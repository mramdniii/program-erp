import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { GodownDiaryService } from './godown-diary.service';

@Controller('godown-diary')
export class GodownDiaryController {
  constructor(private readonly service: GodownDiaryService) {}

  @Get()
  findAll(@Query('godown') godown?: string) {
    if (godown) {
      return this.service.findByGodown(godown);
    }
    return this.service.findAll();
  }

  @Get('product/:id')
  findByProduct(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByProduct(id);
  }
}

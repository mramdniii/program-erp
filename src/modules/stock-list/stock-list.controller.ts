import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StockListService } from './stock-list.service';

@Controller('stock-list')
export class StockListController {
  constructor(private readonly service: StockListService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('product/:id')
  findByProduct(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByProduct(id);
  }
}

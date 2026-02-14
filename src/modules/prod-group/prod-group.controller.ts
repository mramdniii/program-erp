import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProdGroupService } from './prod-group.service';

@Controller('prod-groups')
export class ProdGroupController {
  constructor(private readonly prodGroupService: ProdGroupService) {}

  @Get()
  findAll() {
    return this.prodGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prodGroupService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.prodGroupService.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.prodGroupService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prodGroupService.remove(id);
  }
}

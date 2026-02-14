#!/bin/bash

# StockList Module
mkdir -p src/modules/stock-list
cat > src/modules/stock-list/stock-list.service.ts << 'EOF'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockList } from './stock-list.entity';

@Injectable()
export class StockListService {
  constructor(@InjectRepository(StockList) private repo: Repository<StockList>) {}
  
  findAll(): Promise<StockList[]> {
    return this.repo.find({ relations: ['productRel'], order: { id: 'ASC' } });
  }

  async findByProduct(productId: number): Promise<StockList> {
    return this.repo.findOne({ where: { products: productId }, relations: ['productRel'] });
  }
}
EOF

cat > src/modules/stock-list/stock-list.controller.ts << 'EOF'
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
EOF

cat > src/modules/stock-list/stock-list.module.ts << 'EOF'
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
EOF

# StockAdjust Module
mkdir -p src/modules/stock-adjust
cat > src/modules/stock-adjust/stock-adjust.service.ts << 'EOF'
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { StockAdjust } from './stock-adjust.entity';
import { StockList } from '../stock-list/stock-list.entity';
import { GodownDiary } from '../godown-diary/godown-diary.entity';

@Injectable()
export class StockAdjustService {
  constructor(
    @InjectRepository(StockAdjust) private repo: Repository<StockAdjust>,
    @InjectRepository(StockList) private stockListRepo: Repository<StockList>,
    @InjectRepository(GodownDiary) private godownDiaryRepo: Repository<GodownDiary>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<StockAdjust[]> {
    return this.repo.find({ relations: ['productRel'], order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<StockAdjust> {
    const adjust = await this.repo.findOne({ where: { id }, relations: ['productRel'] });
    if (!adjust) throw new NotFoundException(\`Stock Adjust \${id} not found\`);
    return adjust;
  }

  async create(data: any): Promise<StockAdjust> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const adjust = this.repo.create(data);
      await queryRunner.manager.save(adjust);

      // Update stock
      let stock = await queryRunner.manager.findOne(StockList, { where: { products: data.products } });
      if (!stock) {
        stock = this.stockListRepo.create({ products: data.products, qty: 0 });
      }

      if (data.type === 'IN') {
        stock.qty = Number(stock.qty) + Number(data.qty);
      } else {
        stock.qty = Number(stock.qty) - Number(data.qty);
      }
      
      await queryRunner.manager.save(stock);

      // Create godown diary
      await queryRunner.manager.save(
        this.godownDiaryRepo.create({
          transDate: data.adjustDate,
          transType: 'ADJUSTMENT',
          transRef: data.adjustNo,
          products: data.products,
          godown: data.godown || 'Main Warehouse',
          qtyIn: data.type === 'IN' ? data.qty : 0,
          qtyOut: data.type === 'OUT' ? data.qty : 0,
          notes: data.notes,
        })
      );

      await queryRunner.commitTransaction();
      return this.findOne(adjust.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const adjust = await this.findOne(id);

      // Reverse stock
      let stock = await queryRunner.manager.findOne(StockList, { where: { products: adjust.products } });
      if (stock) {
        if (adjust.type === 'IN') {
          stock.qty = Number(stock.qty) - Number(adjust.qty);
        } else {
          stock.qty = Number(stock.qty) + Number(adjust.qty);
        }
        await queryRunner.manager.save(stock);
      }

      await queryRunner.manager.delete(GodownDiary, { transRef: adjust.adjustNo });
      await queryRunner.manager.remove(adjust);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
EOF

cat > src/modules/stock-adjust/stock-adjust.controller.ts << 'EOF'
import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { StockAdjustService } from './stock-adjust.service';

@Controller('stock-adjust')
export class StockAdjustController {
  constructor(private readonly service: StockAdjustService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
EOF

cat > src/modules/stock-adjust/stock-adjust.module.ts << 'EOF'
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
EOF

# GodownDiary Module
mkdir -p src/modules/godown-diary
cat > src/modules/godown-diary/godown-diary.service.ts << 'EOF'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GodownDiary } from './godown-diary.entity';

@Injectable()
export class GodownDiaryService {
  constructor(@InjectRepository(GodownDiary) private repo: Repository<GodownDiary>) {}

  findAll(): Promise<GodownDiary[]> {
    return this.repo.find({ relations: ['productRel'], order: { transDate: 'DESC', id: 'DESC' } });
  }

  findByProduct(productId: number): Promise<GodownDiary[]> {
    return this.repo.find({ where: { products: productId }, relations: ['productRel'], order: { transDate: 'DESC' } });
  }

  findByGodown(godown: string): Promise<GodownDiary[]> {
    return this.repo.find({ where: { godown }, relations: ['productRel'], order: { transDate: 'DESC' } });
  }
}
EOF

cat > src/modules/godown-diary/godown-diary.controller.ts << 'EOF'
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
EOF

cat > src/modules/godown-diary/godown-diary.module.ts << 'EOF'
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
EOF

echo "All modules created!"

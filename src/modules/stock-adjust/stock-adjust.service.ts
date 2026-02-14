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
    if (!adjust) throw new NotFoundException(`Stock Adjust ${id} not found`);
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
      return this.findOne(data.id);
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

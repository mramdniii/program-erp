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

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

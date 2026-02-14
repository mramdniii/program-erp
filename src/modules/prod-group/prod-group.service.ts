import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdGroup } from './prod-group.entity';

@Injectable()
export class ProdGroupService {
  constructor(
    @InjectRepository(ProdGroup)
    private prodGroupRepository: Repository<ProdGroup>,
  ) {}

  findAll(): Promise<ProdGroup[]> {
    return this.prodGroupRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<ProdGroup> {
    const prodGroup = await this.prodGroupRepository.findOne({ where: { id } });
    if (!prodGroup) {
      throw new NotFoundException(`ProdGroup with ID ${id} not found`);
    }
    return prodGroup;
  }

  create(data: Partial<ProdGroup>): Promise<ProdGroup> {
    const prodGroup = this.prodGroupRepository.create(data);
    return this.prodGroupRepository.save(prodGroup);
  }

  async update(id: number, data: Partial<ProdGroup>): Promise<ProdGroup> {
    const prodGroup = await this.findOne(id);
    Object.assign(prodGroup, data);
    return this.prodGroupRepository.save(prodGroup);
  }

  async remove(id: number): Promise<void> {
    const prodGroup = await this.findOne(id);
    await this.prodGroupRepository.remove(prodGroup);
  }
}

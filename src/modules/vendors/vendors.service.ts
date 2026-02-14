import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';

@Injectable()
export class VendorsService {
  constructor(@InjectRepository(Vendor) private repo: Repository<Vendor>) {}
  findAll(): Promise<Vendor[]> { return this.repo.find({ order: { id: 'DESC' } }); }
  async findOne(id: number): Promise<Vendor> {
    const vendor = await this.repo.findOne({ where: { id } });
    if (!vendor) throw new NotFoundException(`Vendor ${id} not found`);
    return vendor;
  }
  create(data: Partial<Vendor>): Promise<Vendor> { return this.repo.save(this.repo.create(data)); }
  async update(id: number, data: Partial<Vendor>): Promise<Vendor> {
    const vendor = await this.findOne(id);
    return this.repo.save({ ...vendor, ...data });
  }
  async remove(id: number): Promise<void> { await this.repo.delete(id); }
}

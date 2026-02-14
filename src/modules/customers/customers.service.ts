import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {
  constructor(@InjectRepository(Customer) private repo: Repository<Customer>) {}
  findAll(): Promise<Customer[]> { return this.repo.find({ order: { id: 'DESC' } }); }
  async findOne(id: number): Promise<Customer> {
    const customer = await this.repo.findOne({ where: { id } });
    if (!customer) throw new NotFoundException(`Customer ${id} not found`);
    return customer;
  }
  create(data: Partial<Customer>): Promise<Customer> { return this.repo.save(this.repo.create(data)); }
  async update(id: number, data: Partial<Customer>): Promise<Customer> {
    const customer = await this.findOne(id);
    return this.repo.save({ ...customer, ...data });
  }
  async remove(id: number): Promise<void> { await this.repo.delete(id); }
}

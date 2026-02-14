#!/bin/bash

# Vendors Module
mkdir -p src/modules/vendors
cat > src/modules/vendors/vendors.service.ts << 'EOF'
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
    if (!vendor) throw new NotFoundException(\`Vendor \${id} not found\`);
    return vendor;
  }
  create(data: Partial<Vendor>): Promise<Vendor> { return this.repo.save(this.repo.create(data)); }
  async update(id: number, data: Partial<Vendor>): Promise<Vendor> {
    const vendor = await this.findOne(id);
    return this.repo.save({ ...vendor, ...data });
  }
  async remove(id: number): Promise<void> { await this.repo.delete(id); }
}
EOF

cat > src/modules/vendors/vendors.controller.ts << 'EOF'
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { VendorsService } from './vendors.service';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly service: VendorsService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Post() create(@Body() data: any) { return this.service.create(data); }
  @Put(':id') update(@Param('id', ParseIntPipe) id: number, @Body() data: any) { return this.service.update(id, data); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
EOF

cat > src/modules/vendors/vendors.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';
import { Vendor } from './vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor])],
  controllers: [VendorsController],
  providers: [VendorsService],
  exports: [VendorsService],
})
export class VendorsModule {}
EOF

# Customers Module
mkdir -p src/modules/customers
cat > src/modules/customers/customers.service.ts << 'EOF'
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
    if (!customer) throw new NotFoundException(\`Customer \${id} not found\`);
    return customer;
  }
  create(data: Partial<Customer>): Promise<Customer> { return this.repo.save(this.repo.create(data)); }
  async update(id: number, data: Partial<Customer>): Promise<Customer> {
    const customer = await this.findOne(id);
    return this.repo.save({ ...customer, ...data });
  }
  async remove(id: number): Promise<void> { await this.repo.delete(id); }
}
EOF

cat > src/modules/customers/customers.controller.ts << 'EOF'
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Post() create(@Body() data: any) { return this.service.create(data); }
  @Put(':id') update(@Param('id', ParseIntPipe) id: number, @Body() data: any) { return this.service.update(id, data); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
EOF

cat > src/modules/customers/customers.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
EOF

echo "Modules created successfully!"

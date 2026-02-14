import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { SalesOrder } from './sales-order.entity';
import { SaleDetail } from './sale-detail.entity';
import { StockList } from '../stock-list/stock-list.entity';
import { GodownDiary } from '../godown-diary/godown-diary.entity';

@Injectable()
export class SalesOrdersService {
  constructor(
    @InjectRepository(SalesOrder) private salesOrderRepo: Repository<SalesOrder>,
    @InjectRepository(SaleDetail) private saleDetailRepo: Repository<SaleDetail>,
    @InjectRepository(StockList) private stockListRepo: Repository<StockList>,
    @InjectRepository(GodownDiary) private godownDiaryRepo: Repository<GodownDiary>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<SalesOrder[]> {
    return this.salesOrderRepo.find({
      relations: ['customerRel', 'details', 'details.productRel'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<SalesOrder> {
    const order = await this.salesOrderRepo.findOne({
      where: { id },
      relations: ['customerRel', 'details', 'details.productRel'],
    });
    if (!order) throw new NotFoundException(`Sales Order ${id} not found`);
    return order;
  }

  async create(data: any): Promise<SalesOrder> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = this.salesOrderRepo.create({
        orderNo: data.orderNo,
        orderDate: data.orderDate,
        customers: data.customers,
        notes: data.notes,
        totalAmount: 0,
      });
      
      await queryRunner.manager.save(order);

      let totalAmount = 0;

      for (const detail of data.details || []) {
        // Check stock availability
        const stock = await queryRunner.manager.findOne(StockList, { where: { products: detail.products } });
        if (!stock || Number(stock.qty) < Number(detail.qty)) {
          throw new BadRequestException(`Insufficient stock for product ID ${detail.products}`);
        }

        const amount = detail.qty * detail.price;
        totalAmount += amount;

        const saleDetail = this.saleDetailRepo.create({
          salesOrders: order.id,
          products: detail.products,
          qty: detail.qty,
          price: detail.price,
          amount: amount,
        });
        
        await queryRunner.manager.save(saleDetail);

        // Update stock
        await this.updateStock(queryRunner, detail.products, detail.qty, 'SUBTRACT');

        // Create godown diary entry
        await queryRunner.manager.save(
          this.godownDiaryRepo.create({
            transDate: order.orderDate,
            transType: 'SALES',
            transRef: order.orderNo,
            products: detail.products,
            godown: data.godown || 'Main Warehouse',
            qtyIn: 0,
            qtyOut: detail.qty,
            notes: `Sales Order: ${order.orderNo}`,
          })
        );
      }

      order.totalAmount = totalAmount;
      await queryRunner.manager.save(order);

      await queryRunner.commitTransaction();
      
      return this.findOne(order.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, data: any): Promise<SalesOrder> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await this.findOne(id);

      // Reverse old stock
      for (const detail of order.details) {
        await this.updateStock(queryRunner, detail.products, detail.qty, 'ADD');
      }

      // Delete old details
      await queryRunner.manager.delete(SaleDetail, { salesOrders: id });
      await queryRunner.manager.delete(GodownDiary, { transRef: order.orderNo });

      // Update order
      order.orderNo = data.orderNo || order.orderNo;
      order.orderDate = data.orderDate || order.orderDate;
      order.customers = data.customers || order.customers;
      order.notes = data.notes || order.notes;

      let totalAmount = 0;

      for (const detail of data.details || []) {
        const stock = await queryRunner.manager.findOne(StockList, { where: { products: detail.products } });
        if (!stock || Number(stock.qty) < Number(detail.qty)) {
          throw new BadRequestException(`Insufficient stock for product ID ${detail.products}`);
        }

        const amount = detail.qty * detail.price;
        totalAmount += amount;

        await queryRunner.manager.save(
          this.saleDetailRepo.create({
            salesOrders: order.id,
            products: detail.products,
            qty: detail.qty,
            price: detail.price,
            amount: amount,
          })
        );

        await this.updateStock(queryRunner, detail.products, detail.qty, 'SUBTRACT');

        await queryRunner.manager.save(
          this.godownDiaryRepo.create({
            transDate: order.orderDate,
            transType: 'SALES',
            transRef: order.orderNo,
            products: detail.products,
            godown: data.godown || 'Main Warehouse',
            qtyIn: 0,
            qtyOut: detail.qty,
          })
        );
      }

      order.totalAmount = totalAmount;
      await queryRunner.manager.save(order);

      await queryRunner.commitTransaction();
      return this.findOne(id);
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
      const order = await this.findOne(id);

      // Reverse stock
      for (const detail of order.details) {
        await this.updateStock(queryRunner, detail.products, detail.qty, 'ADD');
      }

      await queryRunner.manager.delete(GodownDiary, { transRef: order.orderNo });
      await queryRunner.manager.remove(order);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async updateStock(queryRunner: any, productId: number, qty: number, operation: 'ADD' | 'SUBTRACT'): Promise<void> {
    let stock = await queryRunner.manager.findOne(StockList, { where: { products: productId } });
    
    if (!stock) {
      stock = this.stockListRepo.create({
        products: productId,
        qty: 0,
      });
    }

    if (operation === 'ADD') {
      stock.qty = Number(stock.qty) + Number(qty);
    } else {
      stock.qty = Number(stock.qty) - Number(qty);
    }

    await queryRunner.manager.save(stock);
  }
}

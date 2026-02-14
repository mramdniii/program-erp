import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { PurcOrder } from './purc-order.entity';
import { PurcDetail } from './purc-detail.entity';
import { StockList } from '../stock-list/stock-list.entity';
import { GodownDiary } from '../godown-diary/godown-diary.entity';

@Injectable()
export class PurcOrdersService {
  constructor(
    @InjectRepository(PurcOrder) private purcOrderRepo: Repository<PurcOrder>,
    @InjectRepository(PurcDetail) private purcDetailRepo: Repository<PurcDetail>,
    @InjectRepository(StockList) private stockListRepo: Repository<StockList>,
    @InjectRepository(GodownDiary) private godownDiaryRepo: Repository<GodownDiary>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<PurcOrder[]> {
    return this.purcOrderRepo.find({
      relations: ['vendorRel', 'details', 'details.productRel'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<PurcOrder> {
    const order = await this.purcOrderRepo.findOne({
      where: { id },
      relations: ['vendorRel', 'details', 'details.productRel'],
    });
    if (!order) throw new NotFoundException(`Purchase Order ${id} not found`);
    return order;
  }

  async create(data: any): Promise<PurcOrder> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create purchase order
      const order = this.purcOrderRepo.create({
        orderNo: data.orderNo,
        orderDate: data.orderDate,
        vendors: data.vendors,
        notes: data.notes,
        totalAmount: 0,
      });
      
      await queryRunner.manager.save(order);

      let totalAmount = 0;

      // Create details and update stock
      for (const detail of data.details || []) {
        const amount = detail.qty * detail.price;
        totalAmount += amount;

        const purcDetail = this.purcDetailRepo.create({
          purcOrders: order.id,
          products: detail.products,
          qty: detail.qty,
          price: detail.price,
          amount: amount,
        });
        
        await queryRunner.manager.save(purcDetail);

        // Update stock
        await this.updateStock(queryRunner, detail.products, detail.qty, 'ADD');

        // Create godown diary entry
        await queryRunner.manager.save(
          this.godownDiaryRepo.create({
            transDate: order.orderDate,
            transType: 'PURCHASE',
            transRef: order.orderNo,
            products: detail.products,
            godown: data.godown || 'Main Warehouse',
            qtyIn: detail.qty,
            qtyOut: 0,
            notes: `Purchase Order: ${order.orderNo}`,
          })
        );
      }

      // Update total amount
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

  async update(id: number, data: any): Promise<PurcOrder> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await this.findOne(id);

      // Reverse old stock
      for (const detail of order.details) {
        await this.updateStock(queryRunner, detail.products, detail.qty, 'SUBTRACT');
      }

      // Delete old details
      await queryRunner.manager.delete(PurcDetail, { purcOrders: id });
      await queryRunner.manager.delete(GodownDiary, { transRef: order.orderNo });

      // Update order
      order.orderNo = data.orderNo || order.orderNo;
      order.orderDate = data.orderDate || order.orderDate;
      order.vendors = data.vendors || order.vendors;
      order.notes = data.notes || order.notes;

      let totalAmount = 0;

      // Create new details and update stock
      for (const detail of data.details || []) {
        const amount = detail.qty * detail.price;
        totalAmount += amount;

        await queryRunner.manager.save(
          this.purcDetailRepo.create({
            purcOrders: order.id,
            products: detail.products,
            qty: detail.qty,
            price: detail.price,
            amount: amount,
          })
        );

        await this.updateStock(queryRunner, detail.products, detail.qty, 'ADD');

        await queryRunner.manager.save(
          this.godownDiaryRepo.create({
            transDate: order.orderDate,
            transType: 'PURCHASE',
            transRef: order.orderNo,
            products: detail.products,
            godown: data.godown || 'Main Warehouse',
            qtyIn: detail.qty,
            qtyOut: 0,
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
        await this.updateStock(queryRunner, detail.products, detail.qty, 'SUBTRACT');
      }

      // Delete godown diary
      await queryRunner.manager.delete(GodownDiary, { transRef: order.orderNo });

      // Delete order (cascade will delete details)
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

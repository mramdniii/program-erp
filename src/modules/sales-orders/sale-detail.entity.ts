import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SalesOrder } from './sales-order.entity';
import { Product } from '../products/product.entity';

@Entity('saledetails')
export class SaleDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'salesOrders' })
  salesOrders: number;

  @Column()
  products: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  qty: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => SalesOrder, salesOrder => salesOrder.details, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'salesOrders' })
  salesOrderRel: SalesOrder;

  @ManyToOne(() => Product, product => product.saleDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'products' })
  productRel: Product;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Customer } from '../customers/customer.entity';
import { SaleDetail } from './sale-detail.entity';

@Entity('salesorders')
export class SalesOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_no', length: 50, unique: true })
  orderNo: string;

  @Column({ name: 'order_date', type: 'date' })
  orderDate: Date;

  @Column({ nullable: true })
  customers: number;

  @Column({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Customer, customer => customer.salesOrders)
  @JoinColumn({ name: 'customers' })
  customerRel: Customer;

  @OneToMany(() => SaleDetail, saleDetail => saleDetail.salesOrderRel, { cascade: true })
  details: SaleDetail[];
}

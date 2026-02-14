import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PurcOrder } from './purc-order.entity';
import { Product } from '../products/product.entity';

@Entity('purcdetails')
export class PurcDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'purcOrders' })
  purcOrders: number;

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

  @ManyToOne(() => PurcOrder, purcOrder => purcOrder.details, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'purcOrders' })
  purcOrderRel: PurcOrder;

  @ManyToOne(() => Product, product => product.purcDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'products' })
  productRel: Product;
}

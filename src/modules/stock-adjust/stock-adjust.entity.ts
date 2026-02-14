import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('stockadjust')
export class StockAdjust {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'adjust_no', length: 50, unique: true })
  adjustNo: string;

  @Column({ name: 'adjust_date', type: 'date' })
  adjustDate: Date;

  @Column()
  products: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  qty: number;

  @Column({ length: 10 })
  type: string; // 'IN' or 'OUT'

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Product, product => product.stockAdjusts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'products' })
  productRel: Product;
}

import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('stocklist')
export class StockList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  products: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  qty: number;

  @UpdateDateColumn({ name: 'last_updated' })
  lastUpdated: Date;

  @OneToOne(() => Product, product => product.stockList, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'products' })
  productRel: Product;
}

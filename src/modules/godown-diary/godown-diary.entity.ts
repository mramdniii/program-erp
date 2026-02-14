import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('godowndiary')
export class GodownDiary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'trans_date', type: 'date' })
  transDate: Date;

  @Column({ name: 'trans_type', length: 20 })
  transType: string; // 'PURCHASE', 'SALES', 'ADJUSTMENT', etc.

  @Column({ name: 'trans_ref', length: 50, nullable: true })
  transRef: string;

  @Column()
  products: number;

  @Column({ length: 255, nullable: true })
  godown: string;

  @Column({ name: 'qty_in', type: 'decimal', precision: 15, scale: 2, default: 0 })
  qtyIn: number;

  @Column({ name: 'qty_out', type: 'decimal', precision: 15, scale: 2, default: 0 })
  qtyOut: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Product, product => product.godownDiaries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'products' })
  productRel: Product;
}

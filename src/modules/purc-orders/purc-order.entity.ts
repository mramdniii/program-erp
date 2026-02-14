import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Vendor } from '../vendors/vendor.entity';
import { PurcDetail } from './purc-detail.entity';

@Entity('purcorders')
export class PurcOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_no', length: 50, unique: true })
  orderNo: string;

  @Column({ name: 'order_date', type: 'date' })
  orderDate: Date;

  @Column({ nullable: true })
  vendors: number;

  @Column({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Vendor, vendor => vendor.purcOrders)
  @JoinColumn({ name: 'vendors' })
  vendorRel: Vendor;

  @OneToMany(() => PurcDetail, purcdetail => purcdetail.purcOrderRel, { cascade: true })
  details: PurcDetail[];
}

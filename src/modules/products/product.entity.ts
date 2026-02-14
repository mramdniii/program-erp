import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ProdGroup } from '../prod-group/prod-group.entity';
import { Vendor } from '../vendors/vendor.entity';
import { PurcDetail } from '../purc-orders/purc-detail.entity';
import { SaleDetail } from '../sales-orders/sale-detail.entity';
import { StockList } from '../stock-list/stock-list.entity';
import { StockAdjust } from '../stock-adjust/stock-adjust.entity';
import { GodownDiary } from '../godown-diary/godown-diary.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  code: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'prodGroup', nullable: true })
  prodGroup: number;

  @Column({ nullable: true })
  vendors: number;

  @Column({ length: 50, nullable: true })
  unit: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => ProdGroup, prodgroup => prodgroup.products)
  @JoinColumn({ name: 'prodGroup' })
  prodGroupRel: ProdGroup;

  @ManyToOne(() => Vendor, vendor => vendor.products)
  @JoinColumn({ name: 'vendors' })
  vendorRel: Vendor;

  @OneToMany(() => PurcDetail, purcdetail => purcdetail.productRel)
  purcDetails: PurcDetail[];

  @OneToMany(() => SaleDetail, saledetail => saledetail.productRel)
  saleDetails: SaleDetail[];

  @OneToOne(() => StockList, stocklist => stocklist.productRel)
  stockList: StockList;

  @OneToMany(() => StockAdjust, stockAdjust => stockAdjust.productRel)
  stockAdjusts: StockAdjust[];

  @OneToMany(() => GodownDiary, godownDiary => godownDiary.productRel)
  godownDiaries: GodownDiary[];
}

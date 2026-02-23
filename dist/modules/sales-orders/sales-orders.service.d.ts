import { Repository, DataSource } from 'typeorm';
import { SalesOrder } from './sales-order.entity';
import { SaleDetail } from './sale-detail.entity';
import { StockList } from '../stock-list/stock-list.entity';
import { GodownDiary } from '../godown-diary/godown-diary.entity';
export declare class SalesOrdersService {
    private salesOrderRepo;
    private saleDetailRepo;
    private stockListRepo;
    private godownDiaryRepo;
    private dataSource;
    constructor(salesOrderRepo: Repository<SalesOrder>, saleDetailRepo: Repository<SaleDetail>, stockListRepo: Repository<StockList>, godownDiaryRepo: Repository<GodownDiary>, dataSource: DataSource);
    private generatedOrderNo;
    findAll(): Promise<SalesOrder[]>;
    findOne(id: number): Promise<SalesOrder>;
    create(data: any): Promise<SalesOrder>;
    update(id: number, data: any): Promise<SalesOrder>;
    remove(id: number): Promise<void>;
    private updateStock;
}

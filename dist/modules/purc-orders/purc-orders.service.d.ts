import { Repository, DataSource } from 'typeorm';
import { PurcOrder } from './purc-order.entity';
import { PurcDetail } from './purc-detail.entity';
import { StockList } from '../stock-list/stock-list.entity';
import { GodownDiary } from '../godown-diary/godown-diary.entity';
export declare class PurcOrdersService {
    private purcOrderRepo;
    private purcDetailRepo;
    private stockListRepo;
    private godownDiaryRepo;
    private dataSource;
    constructor(purcOrderRepo: Repository<PurcOrder>, purcDetailRepo: Repository<PurcDetail>, stockListRepo: Repository<StockList>, godownDiaryRepo: Repository<GodownDiary>, dataSource: DataSource);
    findAll(): Promise<PurcOrder[]>;
    findOne(id: number): Promise<PurcOrder>;
    create(data: any): Promise<PurcOrder>;
    update(id: number, data: any): Promise<PurcOrder>;
    remove(id: number): Promise<void>;
    private updateStock;
}

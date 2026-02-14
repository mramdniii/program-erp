import { Repository, DataSource } from 'typeorm';
import { StockAdjust } from './stock-adjust.entity';
import { StockList } from '../stock-list/stock-list.entity';
import { GodownDiary } from '../godown-diary/godown-diary.entity';
export declare class StockAdjustService {
    private repo;
    private stockListRepo;
    private godownDiaryRepo;
    private dataSource;
    constructor(repo: Repository<StockAdjust>, stockListRepo: Repository<StockList>, godownDiaryRepo: Repository<GodownDiary>, dataSource: DataSource);
    findAll(): Promise<StockAdjust[]>;
    findOne(id: number): Promise<StockAdjust>;
    create(data: any): Promise<StockAdjust>;
    remove(id: number): Promise<void>;
}

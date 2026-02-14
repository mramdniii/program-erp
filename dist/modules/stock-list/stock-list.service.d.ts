import { Repository } from 'typeorm';
import { StockList } from './stock-list.entity';
export declare class StockListService {
    private repo;
    constructor(repo: Repository<StockList>);
    findAll(): Promise<StockList[]>;
    findByProduct(productId: number): Promise<StockList>;
}

import { StockListService } from './stock-list.service';
export declare class StockListController {
    private readonly service;
    constructor(service: StockListService);
    findAll(): Promise<import("./stock-list.entity").StockList[]>;
    findByProduct(id: number): Promise<import("./stock-list.entity").StockList>;
}

import { StockAdjustService } from './stock-adjust.service';
export declare class StockAdjustController {
    private readonly service;
    constructor(service: StockAdjustService);
    findAll(): Promise<import("./stock-adjust.entity").StockAdjust[]>;
    findOne(id: number): Promise<import("./stock-adjust.entity").StockAdjust>;
    create(data: any): Promise<import("./stock-adjust.entity").StockAdjust>;
    remove(id: number): Promise<void>;
}

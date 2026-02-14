import { SalesOrdersService } from './sales-orders.service';
export declare class SalesOrdersController {
    private readonly service;
    constructor(service: SalesOrdersService);
    findAll(): Promise<import("./sales-order.entity").SalesOrder[]>;
    findOne(id: number): Promise<import("./sales-order.entity").SalesOrder>;
    create(data: any): Promise<import("./sales-order.entity").SalesOrder>;
    update(id: number, data: any): Promise<import("./sales-order.entity").SalesOrder>;
    remove(id: number): Promise<void>;
}

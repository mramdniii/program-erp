import { PurcOrdersService } from './purc-orders.service';
export declare class PurcOrdersController {
    private readonly service;
    constructor(service: PurcOrdersService);
    findAll(): Promise<import("./purc-order.entity").PurcOrder[]>;
    findOne(id: number): Promise<import("./purc-order.entity").PurcOrder>;
    create(data: any): Promise<import("./purc-order.entity").PurcOrder>;
    update(id: number, data: any): Promise<import("./purc-order.entity").PurcOrder>;
    remove(id: number): Promise<void>;
}

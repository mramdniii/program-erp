import { CustomersService } from './customers.service';
export declare class CustomersController {
    private readonly service;
    constructor(service: CustomersService);
    findAll(): Promise<import("./customer.entity").Customer[]>;
    findOne(id: number): Promise<import("./customer.entity").Customer>;
    create(data: any): Promise<import("./customer.entity").Customer>;
    update(id: number, data: any): Promise<import("./customer.entity").Customer>;
    remove(id: number): Promise<void>;
}

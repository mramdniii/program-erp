import { VendorsService } from './vendors.service';
export declare class VendorsController {
    private readonly service;
    constructor(service: VendorsService);
    findAll(): Promise<import("./vendor.entity").Vendor[]>;
    findOne(id: number): Promise<import("./vendor.entity").Vendor>;
    create(data: any): Promise<import("./vendor.entity").Vendor>;
    update(id: number, data: any): Promise<import("./vendor.entity").Vendor>;
    remove(id: number): Promise<void>;
}

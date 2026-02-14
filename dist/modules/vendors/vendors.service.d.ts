import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
export declare class VendorsService {
    private repo;
    constructor(repo: Repository<Vendor>);
    findAll(): Promise<Vendor[]>;
    findOne(id: number): Promise<Vendor>;
    create(data: Partial<Vendor>): Promise<Vendor>;
    update(id: number, data: Partial<Vendor>): Promise<Vendor>;
    remove(id: number): Promise<void>;
}

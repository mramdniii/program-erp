import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
export declare class CustomersService {
    private repo;
    constructor(repo: Repository<Customer>);
    findAll(): Promise<Customer[]>;
    findOne(id: number): Promise<Customer>;
    create(data: Partial<Customer>): Promise<Customer>;
    update(id: number, data: Partial<Customer>): Promise<Customer>;
    remove(id: number): Promise<void>;
}

import { Customer } from '../customers/customer.entity';
import { SaleDetail } from './sale-detail.entity';
export declare class SalesOrder {
    id: number;
    orderNo: string;
    orderDate: Date;
    customers: number;
    totalAmount: number;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    customerRel: Customer;
    details: SaleDetail[];
}

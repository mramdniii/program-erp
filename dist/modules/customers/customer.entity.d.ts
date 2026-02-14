import { SalesOrder } from '../sales-orders/sales-order.entity';
export declare class Customer {
    id: number;
    name: string;
    contact: string;
    address: string;
    phone: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    salesOrders: SalesOrder[];
}

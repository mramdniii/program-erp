import { SalesOrder } from './sales-order.entity';
import { Product } from '../products/product.entity';
export declare class SaleDetail {
    id: number;
    salesOrders: number;
    products: number;
    qty: number;
    price: number;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    salesOrderRel: SalesOrder;
    productRel: Product;
}

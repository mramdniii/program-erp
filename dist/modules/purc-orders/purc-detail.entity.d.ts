import { PurcOrder } from './purc-order.entity';
import { Product } from '../products/product.entity';
export declare class PurcDetail {
    id: number;
    purcOrders: number;
    products: number;
    qty: number;
    price: number;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    purcOrderRel: PurcOrder;
    productRel: Product;
}

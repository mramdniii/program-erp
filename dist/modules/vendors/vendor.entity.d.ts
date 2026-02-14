import { Product } from '../products/product.entity';
import { PurcOrder } from '../purc-orders/purc-order.entity';
export declare class Vendor {
    id: number;
    name: string;
    contact: string;
    address: string;
    phone: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
    purcOrders: PurcOrder[];
}

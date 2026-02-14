import { Product } from '../products/product.entity';
export declare class StockList {
    id: number;
    products: number;
    qty: number;
    lastUpdated: Date;
    productRel: Product;
}

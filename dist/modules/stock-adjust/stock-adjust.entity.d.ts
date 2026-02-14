import { Product } from '../products/product.entity';
export declare class StockAdjust {
    id: number;
    adjustNo: string;
    adjustDate: Date;
    products: number;
    qty: number;
    type: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    productRel: Product;
}

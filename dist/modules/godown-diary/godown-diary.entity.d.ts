import { Product } from '../products/product.entity';
export declare class GodownDiary {
    id: number;
    transDate: Date;
    transType: string;
    transRef: string;
    products: number;
    godown: string;
    qtyIn: number;
    qtyOut: number;
    notes: string;
    createdAt: Date;
    productRel: Product;
}

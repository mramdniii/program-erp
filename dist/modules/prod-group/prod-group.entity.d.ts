import { Product } from '../products/product.entity';
export declare class ProdGroup {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
}

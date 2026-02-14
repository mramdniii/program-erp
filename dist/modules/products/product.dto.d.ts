export declare class CreateProductDto {
    code: string;
    name: string;
    description?: string;
    prodGroup?: number;
    vendors?: number;
    unit?: string;
    price?: number;
}
export declare class UpdateProductDto {
    code?: string;
    name?: string;
    description?: string;
    prodGroup?: number;
    vendors?: number;
    unit?: string;
    price?: number;
}

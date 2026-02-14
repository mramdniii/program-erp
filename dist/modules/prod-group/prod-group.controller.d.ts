import { ProdGroupService } from './prod-group.service';
export declare class ProdGroupController {
    private readonly prodGroupService;
    constructor(prodGroupService: ProdGroupService);
    findAll(): Promise<import("./prod-group.entity").ProdGroup[]>;
    findOne(id: number): Promise<import("./prod-group.entity").ProdGroup>;
    create(data: any): Promise<import("./prod-group.entity").ProdGroup>;
    update(id: number, data: any): Promise<import("./prod-group.entity").ProdGroup>;
    remove(id: number): Promise<void>;
}

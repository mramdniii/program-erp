import { Repository } from 'typeorm';
import { ProdGroup } from './prod-group.entity';
export declare class ProdGroupService {
    private prodGroupRepository;
    constructor(prodGroupRepository: Repository<ProdGroup>);
    findAll(): Promise<ProdGroup[]>;
    findOne(id: number): Promise<ProdGroup>;
    create(data: Partial<ProdGroup>): Promise<ProdGroup>;
    update(id: number, data: Partial<ProdGroup>): Promise<ProdGroup>;
    remove(id: number): Promise<void>;
}

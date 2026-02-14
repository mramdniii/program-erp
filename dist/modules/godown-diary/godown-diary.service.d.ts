import { Repository } from 'typeorm';
import { GodownDiary } from './godown-diary.entity';
export declare class GodownDiaryService {
    private repo;
    constructor(repo: Repository<GodownDiary>);
    findAll(): Promise<GodownDiary[]>;
    findByProduct(productId: number): Promise<GodownDiary[]>;
    findByGodown(godown: string): Promise<GodownDiary[]>;
}

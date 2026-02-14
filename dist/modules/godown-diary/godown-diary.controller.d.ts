import { GodownDiaryService } from './godown-diary.service';
export declare class GodownDiaryController {
    private readonly service;
    constructor(service: GodownDiaryService);
    findAll(godown?: string): Promise<import("./godown-diary.entity").GodownDiary[]>;
    findByProduct(id: number): Promise<import("./godown-diary.entity").GodownDiary[]>;
}

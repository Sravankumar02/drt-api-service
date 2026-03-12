import { WaitingList } from './entities/waiting.list';
import { WaitingListService } from './waiting.list.service';
export declare class WaitingListController {
    private readonly waitingListService;
    constructor(waitingListService: WaitingListService);
    getWaitingList(from: number, size: number): Promise<WaitingList[]>;
    getWaitingListCount(): Promise<number>;
    getWaitingListCountAlternative(): Promise<number>;
}

import { QueryPagination } from "src/common/entities/query.pagination";
import { IndexerService } from "src/common/indexer/indexer.service";
import { MiniBlockDetailed } from "./entities/mini.block.detailed";
import { MiniBlockFilter } from "./entities/mini.block.filter";
export declare class MiniBlockService {
    private readonly indexerService;
    constructor(indexerService: IndexerService);
    getMiniBlock(miniBlockHash: string): Promise<MiniBlockDetailed>;
    getMiniBlocks(pagination: QueryPagination, filter: MiniBlockFilter): Promise<MiniBlockDetailed[]>;
}

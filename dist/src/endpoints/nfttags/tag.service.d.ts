import { QueryPagination } from "src/common/entities/query.pagination";
import { Tag } from "./entities/tag";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { IndexerService } from "src/common/indexer/indexer.service";
export declare class TagService {
    private readonly indexerService;
    private readonly cachingService;
    constructor(indexerService: IndexerService, cachingService: CacheService);
    getNftTags(pagination: QueryPagination, search?: string): Promise<Tag[]>;
    getNftTagCount(search?: string): Promise<number>;
    private getNftTagCountRaw;
    getNftTagsRaw(pagination: QueryPagination, search?: string): Promise<Tag[]>;
    getNftTag(tag: string): Promise<Tag>;
}

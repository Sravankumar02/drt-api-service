import { NodeService } from "../nodes/node.service";
import { Shard } from "./entities/shard";
import { QueryPagination } from "src/common/entities/query.pagination";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
export declare class ShardService {
    private readonly nodeService;
    private readonly cachingService;
    constructor(nodeService: NodeService, cachingService: CacheService);
    getShards(queryPagination: QueryPagination): Promise<Shard[]>;
    getAllShards(): Promise<Shard[]>;
    getAllShardsRaw(): Promise<Shard[]>;
}

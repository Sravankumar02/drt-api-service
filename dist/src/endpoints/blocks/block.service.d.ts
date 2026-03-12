import { Block } from "./entities/block";
import { BlockDetailed } from "./entities/block.detailed";
import { BlockFilter } from "./entities/block.filter";
import { QueryPagination } from "src/common/entities/query.pagination";
import { BlsService } from "src/endpoints/bls/bls.service";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { IndexerService } from "src/common/indexer/indexer.service";
import { NodeService } from "../nodes/node.service";
import { IdentitiesService } from "../identities/identities.service";
import { ApiConfigService } from "../../common/api-config/api.config.service";
export declare class BlockService {
    private readonly indexerService;
    private readonly cachingService;
    private readonly blsService;
    private readonly nodeService;
    private readonly identitiesService;
    private readonly apiConfigService;
    constructor(indexerService: IndexerService, cachingService: CacheService, blsService: BlsService, nodeService: NodeService, identitiesService: IdentitiesService, apiConfigService: ApiConfigService);
    getBlocksCount(filter: BlockFilter): Promise<number>;
    getBlocks(filter: BlockFilter, queryPagination: QueryPagination, withProposerIdentity?: boolean): Promise<Block[]>;
    private applyProposerIdentity;
    computeProposerAndValidators(item: any): Promise<any>;
    getBlock(hash: string): Promise<BlockDetailed>;
    getCurrentEpoch(): Promise<number>;
    getLatestBlock(ttl?: number): Promise<Block | undefined>;
    getLatestBlockRaw(): Promise<Block | undefined>;
}

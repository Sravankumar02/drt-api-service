import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { NetworkService } from "../network/network.service";
import { NodeService } from "../nodes/node.service";
import { Identity } from "./entities/identity";
import { IdentitySortCriteria } from "./entities/identity.sort.criteria";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { BlockService } from "../blocks/block.service";
import { QueryPagination } from "src/common/entities/query.pagination";
export declare class IdentitiesService {
    private readonly nodeService;
    private readonly cacheService;
    private readonly networkService;
    private readonly apiConfigService;
    private readonly blockService;
    constructor(nodeService: NodeService, cacheService: CacheService, networkService: NetworkService, apiConfigService: ApiConfigService, blockService: BlockService);
    getIdentity(identifier: string): Promise<Identity | undefined>;
    getIdentityAvatar(identifier: string): Promise<string | undefined>;
    getIdentities(queryPagination: QueryPagination, ids: string[], sort?: IdentitySortCriteria[]): Promise<Identity[]>;
    private compareWithCriteria;
    getAllIdentities(): Promise<Identity[]>;
    private computeTotalStakeAndTopUp;
    private getStakeDistributionForIdentity;
    private getStakeInfoForIdentity;
    getAllIdentitiesRaw(): Promise<Identity[]>;
    private processIdentityAvatar;
}

import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { QueryPagination } from "src/common/entities/query.pagination";
import { GraphQlService } from "src/common/graphql/graphql.service";
import { MoaFarm } from "./entities/moa.farm";
import { MoaTokenService } from "./moa.token.service";
import { MoaStakingProxy } from "./entities/moa.staking.proxy";
import { ApiConfigService } from "src/common/api-config/api.config.service";
export declare class MoaFarmService {
    private readonly cachingService;
    private readonly graphQlService;
    private readonly moaTokenService;
    private readonly apiConfigService;
    constructor(cachingService: CacheService, graphQlService: GraphQlService, moaTokenService: MoaTokenService, apiConfigService: ApiConfigService);
    refreshMoaFarms(): Promise<void>;
    getMoaFarms(pagination: QueryPagination): Promise<MoaFarm[]>;
    getAllMoaFarms(): Promise<MoaFarm[]>;
    getMoaFarmsCount(): Promise<number>;
    private getAllMoaFarmsRaw;
    getAllStakingProxies(): Promise<MoaStakingProxy[]>;
    private getAllStakingProxiesRaw;
}

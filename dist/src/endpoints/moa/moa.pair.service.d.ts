import { CacheService } from '@sravankumar02/sdk-nestjs-cache';
import { GraphQlService } from 'src/common/graphql/graphql.service';
import { MoaPair } from './entities/moa.pair';
import { MoaSettingsService } from './moa.settings.service';
import { ApiConfigService } from 'src/common/api-config/api.config.service';
import { MoaPairsFilter } from './entities/moa.pairs..filter';
export declare class MoaPairService {
    private readonly cachingService;
    private readonly moaSettingService;
    private readonly graphQlService;
    private readonly apiConfigService;
    private readonly logger;
    constructor(cachingService: CacheService, moaSettingService: MoaSettingsService, graphQlService: GraphQlService, apiConfigService: ApiConfigService);
    refreshMoaPairs(): Promise<void>;
    getMoaPairs(from: number, size: number, filter?: MoaPairsFilter): Promise<any>;
    getMoaPair(baseId: string, quoteId: string, includeFarms?: boolean): Promise<MoaPair | undefined>;
    getAllMoaPairs(includeFarms?: boolean): Promise<MoaPair[]>;
    getMoaPairsCount(filter?: MoaPairsFilter): Promise<number>;
    getAllMoaPairsRaw(includeFarms?: boolean): Promise<MoaPair[]>;
    private getPairInfo;
    private getPairState;
    private getPairType;
    private applyFilters;
}

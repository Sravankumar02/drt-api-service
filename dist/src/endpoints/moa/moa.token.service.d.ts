import { MoaToken } from "./entities/moa.token";
import { MoaPairService } from "./moa.pair.service";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { MoaFarmService } from "./moa.farm.service";
import { MoaSettingsService } from "./moa.settings.service";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { QueryPagination } from "src/common/entities/query.pagination";
import { MoaTokenType } from "./entities/moa.token.type";
import { GraphQlService } from "src/common/graphql/graphql.service";
export declare class MoaTokenService {
    private readonly cachingService;
    private readonly apiConfigService;
    private readonly moaPairService;
    private readonly moaFarmService;
    private readonly moaSettingsService;
    private readonly graphQlService;
    private readonly logger;
    constructor(cachingService: CacheService, apiConfigService: ApiConfigService, moaPairService: MoaPairService, moaFarmService: MoaFarmService, moaSettingsService: MoaSettingsService, graphQlService: GraphQlService);
    refreshMoaTokens(): Promise<void>;
    getMoaTokens(queryPagination: QueryPagination): Promise<MoaToken[]>;
    getMoaTokenByIdentifier(identifier: string): Promise<MoaToken | undefined>;
    getMoaPrices(): Promise<Record<string, {
        price: number;
        isToken: boolean;
    }>>;
    getMoaPricesRaw(): Promise<Record<string, {
        price: number;
        isToken: boolean;
    }>>;
    getIndexedMoaTokens(): Promise<Record<string, MoaToken>>;
    getIndexedMoaTokensRaw(): Promise<Record<string, MoaToken>>;
    getMoaTokensCount(): Promise<number>;
    private getAllMoaTokens;
    private getAllMoaTokensRaw;
    private getMoaToken;
    getAllMoaTokenTypes(): Promise<MoaTokenType[]>;
    private getAllMoaTokenTypesRaw;
    private computeTradesCountForMoaToken;
}

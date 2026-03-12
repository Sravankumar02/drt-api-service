import { GraphQlService } from "src/common/graphql/graphql.service";
import { MoaTokenChart } from "./entities/moa.token.chart";
import { MoaTokenService } from "./moa.token.service";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
export declare class MoaTokenChartsService {
    private readonly graphQlService;
    private readonly moaTokenService;
    private readonly cachingService;
    private readonly logger;
    constructor(graphQlService: GraphQlService, moaTokenService: MoaTokenService, cachingService: CacheService);
    getTokenPricesHourResolution(tokenIdentifier: string): Promise<MoaTokenChart[] | undefined>;
    getTokenPricesHourResolutionRaw(tokenIdentifier: string): Promise<MoaTokenChart[] | undefined>;
    getTokenPricesDayResolution(tokenIdentifier: string): Promise<MoaTokenChart[] | undefined>;
    getTokenPricesDayResolutionRaw(tokenIdentifier: string): Promise<MoaTokenChart[] | undefined>;
    private convertToMoaTokenChart;
    private isMoaToken;
}

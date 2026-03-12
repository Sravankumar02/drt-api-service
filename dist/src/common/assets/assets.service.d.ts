import { TokenAssets } from "src/common/assets/entities/token.assets";
import { AccountAssets } from "./entities/account.assets";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { MoaPair } from "src/endpoints/moa/entities/moa.pair";
import { Identity } from "src/endpoints/identities/entities/identity";
import { MoaFarm } from "src/endpoints/moa/entities/moa.farm";
import { MoaSettings } from "src/endpoints/moa/entities/moa.settings";
import { NftRank } from "./entities/nft.rank";
import { MoaStakingProxy } from "src/endpoints/moa/entities/moa.staking.proxy";
import { Provider } from "src/endpoints/providers/entities/provider";
import { ApiService } from "@sravankumar02/sdk-nestjs-http";
import { ApiConfigService } from "../api-config/api.config.service";
import { KeybaseIdentity } from "../keybase/entities/keybase.identity";
export declare class AssetsService {
    private readonly apiConfigService;
    private readonly apiService;
    private readonly cachingService;
    constructor(apiConfigService: ApiConfigService, apiService: ApiService, cachingService: CacheService);
    getAllTokenAssets(): Promise<{
        [key: string]: TokenAssets;
    }>;
    getAllTokenAssetsRaw(): Promise<{
        [key: string]: TokenAssets;
    }>;
    getCollectionRanks(identifier: string): Promise<NftRank[] | undefined>;
    getAllCollectionRanks(): Promise<{
        [key: string]: NftRank[];
    }>;
    getAllCollectionRanksRaw(): Promise<{
        [key: string]: NftRank[];
    }>;
    getAllAccountAssets(): Promise<{
        [key: string]: AccountAssets;
    }>;
    getAllAccountAssetsRaw(providers?: Provider[], identities?: Identity[], pairs?: MoaPair[], farms?: MoaFarm[], moaSettings?: MoaSettings, stakingProxies?: MoaStakingProxy[]): Promise<{
        [key: string]: AccountAssets;
    }>;
    getTokenAssets(tokenIdentifier: string): Promise<TokenAssets | undefined>;
    getAllIdentitiesRaw(): Promise<{
        [key: string]: KeybaseIdentity;
    }>;
    getIdentityInfo(identity: string): Promise<KeybaseIdentity | null>;
    createAccountAsset(name: string, tags: string[]): AccountAssets;
}

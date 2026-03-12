import { NodeService } from "src/endpoints/nodes/node.service";
import { ProviderService } from "src/endpoints/providers/provider.service";
import { KeybaseIdentity } from "./entities/keybase.identity";
import { AssetsService } from "../assets/assets.service";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { ApiConfigService } from "../api-config/api.config.service";
export declare class KeybaseService {
    private readonly cachingService;
    private readonly nodeService;
    private readonly providerService;
    private readonly assetsService;
    private readonly apiConfigService;
    private readonly logger;
    constructor(cachingService: CacheService, nodeService: NodeService, providerService: ProviderService, assetsService: AssetsService, apiConfigService: ApiConfigService);
    private getDistinctIdentities;
    confirmIdentities(): Promise<void>;
    getOwners(identity: string): Promise<string[] | undefined>;
    confirmIdentity(identity: string, providerAddresses: string[], blsIdentityDict: Record<string, string>, confirmations: Record<string, string>): Promise<void>;
    confirmIdentityProfiles(): Promise<void>;
    getProfile(identity: string): Promise<KeybaseIdentity | null>;
    private readIdentityInfo;
    getProfileFromAssets(identity: string): Promise<KeybaseIdentity | null>;
}

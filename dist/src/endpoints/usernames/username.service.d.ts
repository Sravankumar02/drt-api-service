import { ApiService } from "@sravankumar02/sdk-nestjs-http";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { VmQueryService } from "../vm.query/vm.query.service";
export declare class UsernameService {
    private readonly cachingService;
    private readonly apiService;
    private readonly apiConfigService;
    private readonly vmQueryService;
    private readonly logger;
    constructor(cachingService: CacheService, apiService: ApiService, apiConfigService: ApiConfigService, vmQueryService: VmQueryService);
    getUsernameForAddressRaw(address: string): Promise<string | null>;
    getUsernameForAddress(address: string): Promise<string | null>;
    private getAddressForUsernameRaw;
    getAddressForUsername(username: string): Promise<string | null>;
    getUsernameRedirectRoute(address: string, withGuardianInfo: boolean | undefined): string;
}

import { ApiConfigService } from "src/common/api-config/api.config.service";
import { VmQueryService } from "src/endpoints/vm.query/vm.query.service";
import { DelegationLegacy } from "./entities/delegation.legacy";
import { AccountDelegationLegacy } from "./entities/account.delegation.legacy";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
export declare class DelegationLegacyService {
    private readonly vmQueryService;
    private readonly apiConfigService;
    private readonly cachingService;
    constructor(vmQueryService: VmQueryService, apiConfigService: ApiConfigService, cachingService: CacheService);
    getDelegation(): Promise<DelegationLegacy>;
    getDelegationRaw(): Promise<DelegationLegacy>;
    getDelegationForAddress(address: string): Promise<AccountDelegationLegacy>;
    numberDecode(encoded: string): string;
}

import { ApiConfigService } from "src/common/api-config/api.config.service";
import { VmQueryService } from "src/endpoints/vm.query/vm.query.service";
import { Delegation } from "./entities/delegation";
import { NodeService } from "../nodes/node.service";
import { ApiService } from "@sravankumar02/sdk-nestjs-http";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { AccountDelegation } from "../stake/entities/account.delegation";
export declare class DelegationService {
    private readonly vmQueryService;
    private readonly apiConfigService;
    private readonly cachingService;
    private readonly nodeService;
    private readonly apiService;
    private readonly logger;
    constructor(vmQueryService: VmQueryService, apiConfigService: ApiConfigService, cachingService: CacheService, nodeService: NodeService, apiService: ApiService);
    getDelegation(): Promise<Delegation>;
    getDelegationRaw(): Promise<Delegation>;
    getDelegationForAddress(address: string): Promise<AccountDelegation[]>;
}

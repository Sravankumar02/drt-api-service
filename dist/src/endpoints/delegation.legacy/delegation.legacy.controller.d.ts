import { DelegationLegacyService } from "./delegation.legacy.service";
import { DelegationLegacy } from "./entities/delegation.legacy";
export declare class DelegationLegacyController {
    private readonly delegationLegacyService;
    constructor(delegationLegacyService: DelegationLegacyService);
    getBlock(): Promise<DelegationLegacy>;
}

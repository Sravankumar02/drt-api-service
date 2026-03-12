import { DelegationService } from "./delegation.service";
import { Delegation } from "./entities/delegation";
export declare class DelegationController {
    private readonly delegationService;
    constructor(delegationService: DelegationService);
    getDelegationDetails(): Promise<Delegation>;
}

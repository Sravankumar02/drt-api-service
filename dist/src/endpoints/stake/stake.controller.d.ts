import { GlobalStake } from "./entities/global.stake";
import { StakeService } from "./stake.service";
export declare class StakeController {
    private readonly stakeService;
    constructor(stakeService: StakeService);
    getGlobalStake(): Promise<GlobalStake | undefined>;
}

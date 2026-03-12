import { QueryConditionOptions } from "@sravankumar02/sdk-nestjs-elastic";
import { Round } from "./entities/round";
import { RoundDetailed } from "./entities/round.detailed";
import { RoundService } from "./round.service";
export declare class RoundController {
    private readonly roundService;
    constructor(roundService: RoundService);
    getRounds(from: number, size: number, validator?: string, condition?: QueryConditionOptions, shard?: number, epoch?: number): Promise<Round[]>;
    getRoundCount(validator?: string, condition?: QueryConditionOptions, shard?: number, epoch?: number): Promise<number>;
    getRoundCountAlternative(validator?: string, condition?: QueryConditionOptions, shard?: number, epoch?: number): Promise<number>;
    getRound(shard: number, round: number): Promise<RoundDetailed>;
}

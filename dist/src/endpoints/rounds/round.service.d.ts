import { Round } from "./entities/round";
import { RoundDetailed } from "./entities/round.detailed";
import { RoundFilter } from "./entities/round.filter";
import { BlsService } from "src/endpoints/bls/bls.service";
import { IndexerService } from "src/common/indexer/indexer.service";
import { ApiConfigService } from "../../common/api-config/api.config.service";
import { BlockService } from "../blocks/block.service";
export declare class RoundService {
    private readonly indexerService;
    private readonly blsService;
    private readonly apiConfigService;
    private readonly blockService;
    constructor(indexerService: IndexerService, blsService: BlsService, apiConfigService: ApiConfigService, blockService: BlockService);
    getRoundCount(filter: RoundFilter): Promise<number>;
    getRounds(filter: RoundFilter): Promise<Round[]>;
    getRound(shard: number, round: number): Promise<RoundDetailed>;
}

import { ShardService } from "./shard.service";
import { Shard } from "./entities/shard";
export declare class ShardController {
    private readonly shardService;
    constructor(shardService: ShardService);
    getShards(from: number, size: number): Promise<Shard[]>;
}

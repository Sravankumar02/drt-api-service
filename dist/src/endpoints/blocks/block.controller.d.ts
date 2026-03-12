import { BlockService } from "./block.service";
import { Block } from "./entities/block";
import { BlockDetailed } from "./entities/block.detailed";
import { SortOrder } from "src/common/entities/sort.order";
export declare class BlockController {
    private readonly blockService;
    constructor(blockService: BlockService);
    getBlocks(from: number, size: number, shard?: number, proposer?: string, validator?: string, epoch?: number, nonce?: number, hashes?: string[], order?: SortOrder, withProposerIdentity?: boolean): Promise<Block[]>;
    getBlocksCount(shard?: number, proposer?: string, validator?: string, epoch?: number, nonce?: number): Promise<number>;
    getBlocksCountAlternative(shard?: number, proposer?: string, validator?: string, epoch?: number, nonce?: number): Promise<number>;
    getLatestBlock(ttl?: number): Promise<Block>;
    getBlock(hash: string): Promise<BlockDetailed>;
}

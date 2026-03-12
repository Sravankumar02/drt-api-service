import { MiniBlockDetailed } from "./entities/mini.block.detailed";
import { MiniBlockService } from "./mini.block.service";
import { MiniBlockType } from "./entities/mini.block.type";
export declare class MiniBlockController {
    private readonly miniBlockService;
    constructor(miniBlockService: MiniBlockService);
    getMiniBlocks(from: number, size: number, hashes?: string[], type?: MiniBlockType): Promise<MiniBlockDetailed[]>;
    getBlock(miniBlockHash: string): Promise<MiniBlockDetailed>;
}

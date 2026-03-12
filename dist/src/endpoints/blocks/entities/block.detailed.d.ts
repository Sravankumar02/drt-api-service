import { Block } from "./block";
export declare class BlockDetailed extends Block {
    constructor(init?: Partial<BlockDetailed>);
    miniBlocksHashes: string[];
    notarizedBlocksHashes: string[];
    validators: string[];
}

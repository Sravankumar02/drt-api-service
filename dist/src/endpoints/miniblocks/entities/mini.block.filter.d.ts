import { MiniBlockType } from "./mini.block.type";
export declare class MiniBlockFilter {
    constructor(init?: Partial<MiniBlockFilter>);
    hashes?: string[];
    type?: MiniBlockType;
}

import { SortOrder } from "src/common/entities/sort.order";
export declare class BlockFilter {
    constructor(init?: Partial<BlockFilter>);
    shard?: number;
    proposer?: string;
    validator?: string;
    epoch?: number;
    nonce?: number;
    beforeNonce?: number;
    afterNonce?: number;
    hashes?: string[];
    order?: SortOrder;
}

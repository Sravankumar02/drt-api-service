export declare class MiniBlockDetailed {
    constructor(init?: Partial<MiniBlockDetailed>);
    miniBlockHash: string;
    receiverBlockHash: string;
    receiverShard: number;
    senderBlockHash: string;
    senderShard: number;
    timestamp: number;
    type: string;
}

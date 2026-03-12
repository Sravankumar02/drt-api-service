export declare class BlockProofDto {
    constructor(init?: Partial<BlockProofDto>);
    pubKeysBitmap?: string;
    aggregatedSignature?: string;
    headerHash?: string;
    headerEpoch?: number;
    headerNonce?: number;
    headerRound?: number;
}

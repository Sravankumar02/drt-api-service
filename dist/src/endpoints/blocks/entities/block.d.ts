import { Identity } from "src/endpoints/identities/entities/identity";
import { BlockProofDto } from "./block.proof";
export declare class Block {
    constructor(init?: Partial<Block>);
    hash: string;
    epoch: number;
    nonce: number;
    prevHash: string;
    proposer: string;
    proposerIdentity: Identity | undefined;
    pubKeyBitmap: string;
    round: number;
    shard: number;
    size: number;
    sizeTxs: number;
    stateRootHash: string;
    timestamp: number;
    timestampMs?: number;
    txCount: number;
    gasConsumed: number;
    gasRefunded: number;
    gasPenalized: number;
    maxGasLimit: number;
    scheduledRootHash: string | undefined;
    previousHeaderProof: BlockProofDto | undefined;
    reserved: string;
    proof: BlockProofDto | undefined;
    static mergeWithElasticResponse<T extends Block>(newBlock: T, blockRaw: any): T;
}

import { Nft } from "./nft";
export declare class NftAccount extends Nft {
    constructor(init?: Partial<NftAccount>);
    balance: string;
    price: number | undefined;
    valueUsd: number | undefined;
    receivedAt: number | undefined;
}

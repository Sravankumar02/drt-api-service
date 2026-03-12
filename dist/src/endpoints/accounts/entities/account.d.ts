import { AccountAssets } from "src/common/assets/entities/account.assets";
export declare class Account {
    constructor(init?: Partial<Account>);
    address: string;
    balance: string;
    nonce: number;
    timestampMs: number;
    timestamp: number;
    shard: number;
    ownerAddress: string | undefined;
    assets: AccountAssets | undefined;
    deployedAt?: number | null;
    deployTxHash?: string | null;
    ownerAssets: AccountAssets | undefined;
    isVerified?: boolean;
    txCount?: number;
    scrCount?: number;
    transfersLast24h: number | undefined;
}

import { AccountAssets } from "src/common/assets/entities/account.assets";
export declare class TransactionLogEvent {
    constructor(init?: Partial<TransactionLogEvent>);
    address: string;
    addressAssets: AccountAssets | undefined;
    identifier: string;
    topics: string[];
    data: string;
    order: number;
    additionalData: string[] | undefined;
}

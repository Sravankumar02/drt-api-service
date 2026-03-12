import { AccountAssets } from "src/common/assets/entities/account.assets";
import { TransactionLogEvent } from "./transaction.log.event";
export declare class TransactionLog {
    constructor(init?: Partial<TransactionLog>);
    id: string | undefined;
    address: string;
    addressAssets: AccountAssets | undefined;
    events: TransactionLogEvent[];
}

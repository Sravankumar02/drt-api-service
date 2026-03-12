import { AccountAssets } from "src/common/assets/entities/account.assets";
import { DcdtType } from "src/endpoints/dcdt/entities/dcdt.type";
import { TransactionOperationAction } from "./transaction.operation.action";
import { TransactionOperationType } from "./transaction.operation.type";
export declare class TransactionOperation {
    constructor(init?: Partial<TransactionOperation>);
    id: string;
    action: TransactionOperationAction;
    type: TransactionOperationType;
    dcdtType?: DcdtType;
    identifier: string;
    ticker?: string;
    collection?: string;
    name?: string;
    value?: string;
    valueUSD?: number;
    sender: string;
    receiver: string;
    senderAssets: AccountAssets | undefined;
    receiverAssets: AccountAssets | undefined;
    decimals?: number;
    data?: string;
    additionalData?: string[];
    message?: string;
    svgUrl?: string;
}

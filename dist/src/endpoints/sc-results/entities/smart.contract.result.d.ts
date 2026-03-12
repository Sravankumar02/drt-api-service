import { AccountAssets } from "src/common/assets/entities/account.assets";
import { TransactionAction } from "src/endpoints/transactions/transaction-action/entities/transaction.action";
import { TransactionLog } from "../../transactions/entities/transaction.log";
export declare class SmartContractResult {
    constructor(init?: Partial<SmartContractResult>);
    hash: string;
    timestamp: number;
    nonce: number;
    gasLimit: number;
    gasPrice: number;
    value: string;
    sender: string;
    receiver: string;
    senderAssets: AccountAssets | undefined;
    receiverAssets: AccountAssets | undefined;
    relayedValue: string;
    data: string;
    prevTxHash: string;
    originalTxHash: string;
    callType: string;
    miniBlockHash: string | undefined;
    logs: TransactionLog | undefined;
    returnMessage: string | undefined;
    action: TransactionAction | undefined;
    function: string | undefined;
    status: string | undefined;
}

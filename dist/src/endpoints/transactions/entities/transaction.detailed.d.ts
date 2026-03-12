import { SmartContractResult } from '../../sc-results/entities/smart.contract.result';
import { Transaction } from './transaction';
import { TransactionReceipt } from './transaction.receipt';
import { TransactionLog } from './transaction.log';
import { TransactionOperation } from './transaction.operation';
export declare class TransactionDetailed extends Transaction {
    constructor(init?: Partial<TransactionDetailed>);
    results: SmartContractResult[] | undefined;
    receipt: TransactionReceipt | undefined;
    price: number | undefined;
    logs: TransactionLog | undefined;
    operations: TransactionOperation[];
    senderBlockHash: string | undefined;
    senderBlockNonce: number | undefined;
    receiverBlockHash: string | undefined;
    receiverBlockNonce: number | undefined;
    inTransit: boolean | undefined;
    relayedVersion: string | undefined;
}

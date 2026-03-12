import { TransactionAction } from "../../transaction-action/entities/transaction.action";
export declare class TransactionDecodeDto {
    constructor(init?: Partial<TransactionDecodeDto>);
    action: TransactionAction | undefined;
    data: string;
    receiver: string;
    sender: string;
    value: string;
}

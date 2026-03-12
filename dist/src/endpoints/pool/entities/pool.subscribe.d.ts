import { TransactionType } from 'src/endpoints/transactions/entities/transaction.type';
export declare class PoolSubscribePayload {
    type?: TransactionType;
    from?: number;
    size?: number;
}

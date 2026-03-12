import { TransactionInPool } from '../../pool/entities/transaction.in.pool.dto';
export interface TransactionWithPpu extends TransactionInPool {
    ppu: number;
}

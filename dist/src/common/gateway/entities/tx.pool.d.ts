import { TxInPoolResponse } from "./tx.in.pool.response";
export declare class TxPool {
    constructor(init?: Partial<TxPool>);
    regularTransactions: TxInPoolResponse[];
    smartContractResults: TxInPoolResponse[];
    rewards: TxInPoolResponse[];
}

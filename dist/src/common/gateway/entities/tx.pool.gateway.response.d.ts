import { TxPool } from "./tx.pool";
export declare class TxPoolGatewayResponse {
    constructor(init?: Partial<TxPoolGatewayResponse>);
    txPool: TxPool;
}

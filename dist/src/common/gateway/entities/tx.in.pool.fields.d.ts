export declare class TxInPoolFields {
    constructor(init?: Partial<TxInPoolFields>);
    data: string;
    gaslimit: number;
    gasprice: number;
    guardian: string;
    guardiansignature: string;
    hash: string;
    nonce: number;
    receiver: string;
    receivershard: number;
    receiverusername: string | null;
    sender: string;
    sendershard: number;
    signature: string;
    value: string;
}

declare const transactionDetails: {
    txHash: string;
    gasLimit: number;
    gasPrice: number;
    gasUsed: number;
    miniBlockHash: string;
    nonce: number;
    receiver: string;
    receiverShard: number;
    round: number;
    sender: string;
    senderShard: number;
    signature: string;
    status: string;
    value: string;
    fee: string;
    timestamp: number;
    data: string;
    tokenIdentifier: string;
    tokenValue: string;
    action: {
        category: string;
        name: string;
        description: string;
        arguments: {
            transfers: {
                type: string;
                token: string;
                ticker: string;
                name: string;
                value: string;
                decimals: number;
            }[];
            receiver: string;
        };
    };
    results: {
        hash: string;
        timestamp: number;
        nonce: number;
        gasLimit: number;
        gasPrice: number;
        value: string;
        sender: string;
        receiver: string;
        data: string;
        prevTxHash: string;
        originalTxHash: string;
        callType: string;
    }[];
    operations: {
        action: string;
        type: string;
        dcdtType: string;
        identifier: string;
        name: string;
        sender: string;
        receiver: string;
        value: string;
        decimals: number;
    }[];
};
export default transactionDetails;

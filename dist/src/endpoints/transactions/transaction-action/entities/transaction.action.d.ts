export declare class TransactionAction {
    constructor(init?: Partial<TransactionAction>);
    category: string;
    name: string;
    description: string;
    arguments?: {
        [key: string]: any;
    };
}

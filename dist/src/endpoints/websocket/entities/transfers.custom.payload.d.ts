export declare class TransferCustomSubscribePayload {
    sender?: string;
    receiver?: string;
    relayer?: string;
    function?: string;
    address?: string;
    token?: string;
    static getClassFields(): string[];
    static getFieldsSubstitutions(): Record<string, string[]>;
}

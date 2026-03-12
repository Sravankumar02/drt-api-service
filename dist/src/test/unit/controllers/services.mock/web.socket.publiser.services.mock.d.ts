/// <reference types="jest" />
export declare const mockWebSocketPublisherService: () => {
    onTransactionCompleted: jest.Mock<any, any, any>;
    onTransactionPendingResults: jest.Mock<any, any, any>;
    onBatchUpdated: jest.Mock<any, any, any>;
};

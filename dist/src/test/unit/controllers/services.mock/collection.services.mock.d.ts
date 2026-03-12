/// <reference types="jest" />
export declare const mockCollectionService: () => {
    getNftCollections: jest.Mock<any, any, any>;
    getNftCollectionCount: jest.Mock<any, any, any>;
    getNftCollection: jest.Mock<any, any, any>;
    getNftCollectionRanks: jest.Mock<any, any, any>;
    isCollection: jest.Mock<any, any, any>;
    getLogoPng: jest.Mock<any, any, any>;
    getLogoSvg: jest.Mock<any, any, any>;
};
export declare const mockNftService: () => {
    getNfts: jest.Mock<any, any, any>;
    getNftCount: jest.Mock<any, any, any>;
    getCollectionOwners: jest.Mock<any, any, any>;
};
export declare const mockTransactionService: () => {
    getTransactions: jest.Mock<any, any, any>;
    getTransactionCount: jest.Mock<any, any, any>;
};

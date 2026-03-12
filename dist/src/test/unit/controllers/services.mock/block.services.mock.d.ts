/// <reference types="jest" />
export declare const mockBlockService: () => {
    getBlocks: jest.Mock<any, any, any>;
    getBlocksCount: jest.Mock<any, any, any>;
    getLatestBlock: jest.Mock<any, any, any>;
    getBlock: jest.Mock<any, any, any>;
};

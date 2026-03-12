"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockTransactionService = exports.mockNftService = exports.mockCollectionService = void 0;
const mockCollectionService = () => ({
    getNftCollections: jest.fn().mockResolvedValue([]),
    getNftCollectionCount: jest.fn().mockResolvedValue(0),
    getNftCollection: jest.fn().mockResolvedValue({}),
    getNftCollectionRanks: jest.fn().mockResolvedValue([]),
    isCollection: jest.fn().mockResolvedValue(false),
    getLogoPng: jest.fn().mockResolvedValue({}),
    getLogoSvg: jest.fn().mockResolvedValue({}),
});
exports.mockCollectionService = mockCollectionService;
const mockNftService = () => ({
    getNfts: jest.fn().mockResolvedValue([]),
    getNftCount: jest.fn().mockResolvedValue(0),
    getCollectionOwners: jest.fn().mockResolvedValue([]),
});
exports.mockNftService = mockNftService;
const mockTransactionService = () => ({
    getTransactions: jest.fn().mockResolvedValue([]),
    getTransactionCount: jest.fn().mockResolvedValue(0),
});
exports.mockTransactionService = mockTransactionService;
//# sourceMappingURL=collection.services.mock.js.map
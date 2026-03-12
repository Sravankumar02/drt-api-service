"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockBlockService = void 0;
const mockBlockService = () => ({
    getBlocks: jest.fn().mockResolvedValue([]),
    getBlocksCount: jest.fn().mockResolvedValue(0),
    getLatestBlock: jest.fn().mockResolvedValue({}),
    getBlock: jest.fn().mockResolvedValue({}),
});
exports.mockBlockService = mockBlockService;
//# sourceMappingURL=block.services.mock.js.map
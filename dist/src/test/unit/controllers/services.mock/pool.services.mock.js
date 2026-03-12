"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockPoolService = void 0;
const mockPoolService = () => ({
    getPool: jest.fn().mockResolvedValue([]),
    getPoolCount: jest.fn().mockResolvedValue(0),
    getTransactionFromPool: jest.fn().mockResolvedValue({}),
});
exports.mockPoolService = mockPoolService;
//# sourceMappingURL=pool.services.mock.js.map
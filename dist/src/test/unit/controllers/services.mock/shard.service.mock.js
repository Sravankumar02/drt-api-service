"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockShardService = void 0;
const mockShardService = () => ({
    getShards: jest.fn().mockResolvedValue([]),
});
exports.mockShardService = mockShardService;
//# sourceMappingURL=shard.service.mock.js.map
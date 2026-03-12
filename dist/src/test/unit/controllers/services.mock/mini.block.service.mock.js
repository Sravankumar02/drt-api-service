"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockMiniBlockService = void 0;
const mockMiniBlockService = () => ({
    getMiniBlocks: jest.fn().mockResolvedValue([]),
    getMiniBlock: jest.fn().mockResolvedValue({}),
});
exports.mockMiniBlockService = mockMiniBlockService;
//# sourceMappingURL=mini.block.service.mock.js.map
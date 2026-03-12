"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockRoundService = void 0;
const mockRoundService = () => ({
    getRounds: jest.fn().mockResolvedValue([]),
    getRoundCount: jest.fn().mockResolvedValue(0),
    getRound: jest.fn().mockResolvedValue({}),
});
exports.mockRoundService = mockRoundService;
//# sourceMappingURL=rounds.services.mock.js.map
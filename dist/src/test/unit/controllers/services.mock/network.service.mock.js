"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockNetworkService = void 0;
const mockNetworkService = () => ({
    getConstants: jest.fn().mockResolvedValue({}),
    getEconomics: jest.fn().mockResolvedValue({}),
    getStats: jest.fn().mockResolvedValue({}),
    getAbout: jest.fn().mockResolvedValue({}),
});
exports.mockNetworkService = mockNetworkService;
//# sourceMappingURL=network.service.mock.js.map
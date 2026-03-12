"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockMoaFarmsService = exports.mockMoaTokensService = exports.mockMoaPairService = exports.mockMoaEconomicsService = exports.mockMoaSettingsService = void 0;
const mockMoaSettingsService = () => ({
    getSettings: jest.fn().mockResolvedValue({}),
});
exports.mockMoaSettingsService = mockMoaSettingsService;
const mockMoaEconomicsService = () => ({
    getMoaEconomics: jest.fn().mockResolvedValue({}),
});
exports.mockMoaEconomicsService = mockMoaEconomicsService;
const mockMoaPairService = () => ({
    getMoaPair: jest.fn().mockResolvedValue({}),
    getMoaPairs: jest.fn().mockResolvedValue([]),
    getMoaPairsCount: jest.fn().mockResolvedValue(0),
});
exports.mockMoaPairService = mockMoaPairService;
const mockMoaTokensService = () => ({
    getMoaTokens: jest.fn().mockResolvedValue([]),
    getMoaTokensCount: jest.fn().mockResolvedValue(0),
    getMoaTokenByIdentifier: jest.fn().mockResolvedValue({}),
});
exports.mockMoaTokensService = mockMoaTokensService;
const mockMoaFarmsService = () => ({
    getMoaFarms: jest.fn().mockResolvedValue([]),
    getMoaFarmsCount: jest.fn().mockResolvedValue(0),
    getMoaTokenByIdentifier: jest.fn().mockResolvedValue({}),
});
exports.mockMoaFarmsService = mockMoaFarmsService;
//# sourceMappingURL=moa.services.mock.js.map
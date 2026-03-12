"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockDappConfigService = void 0;
const mockDappConfigService = () => ({
    getDappConfiguration: jest.fn().mockResolvedValue({}),
});
exports.mockDappConfigService = mockDappConfigService;
//# sourceMappingURL=dapp.config.services.mock.js.map
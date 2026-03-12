"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockKeysService = void 0;
const mockKeysService = () => ({
    getKeyUnbondPeriod: jest.fn().mockResolvedValue({}),
});
exports.mockKeysService = mockKeysService;
//# sourceMappingURL=keys.services.mock.js.map
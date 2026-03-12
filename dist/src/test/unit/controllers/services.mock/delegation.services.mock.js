"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockDelegationService = void 0;
const mockDelegationService = () => ({
    getDelegation: jest.fn().mockResolvedValue({}),
});
exports.mockDelegationService = mockDelegationService;
//# sourceMappingURL=delegation.services.mock.js.map
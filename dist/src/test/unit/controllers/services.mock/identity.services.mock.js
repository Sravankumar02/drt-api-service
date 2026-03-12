"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockIdentityService = void 0;
const mockIdentityService = () => ({
    getIdentities: jest.fn().mockResolvedValue([]),
    getIdentity: jest.fn().mockResolvedValue({}),
    getIdentityAvatar: jest.fn().mockResolvedValue(undefined),
});
exports.mockIdentityService = mockIdentityService;
//# sourceMappingURL=identity.services.mock.js.map
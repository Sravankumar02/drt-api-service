"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockTransferService = void 0;
const mockTransferService = () => ({
    getTransfers: jest.fn().mockResolvedValue([]),
    getTransfersCount: jest.fn().mockResolvedValue(0),
});
exports.mockTransferService = mockTransferService;
//# sourceMappingURL=transfer.services.mock.js.map
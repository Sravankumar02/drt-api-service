"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockWebSocketPublisherService = void 0;
const mockWebSocketPublisherService = () => ({
    onTransactionCompleted: jest.fn().mockResolvedValue({}),
    onTransactionPendingResults: jest.fn().mockResolvedValue({}),
    onBatchUpdated: jest.fn().mockResolvedValue({}),
});
exports.mockWebSocketPublisherService = mockWebSocketPublisherService;
//# sourceMappingURL=web.socket.publiser.services.mock.js.map
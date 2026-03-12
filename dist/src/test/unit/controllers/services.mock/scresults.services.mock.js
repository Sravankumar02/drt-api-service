"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockScResultsService = void 0;
const mockScResultsService = () => ({
    getScResults: jest.fn().mockResolvedValue([]),
    getScResultsCount: jest.fn().mockResolvedValue(0),
    getScResult: jest.fn().mockResolvedValue({}),
});
exports.mockScResultsService = mockScResultsService;
//# sourceMappingURL=scresults.services.mock.js.map
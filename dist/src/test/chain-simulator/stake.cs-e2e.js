"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const env_config_1 = require("./config/env.config");
describe('Stake e2e tests with chain simulator', () => {
    describe('GET /stake', () => {
        let stakeResponse;
        beforeEach(async () => {
            stakeResponse = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/stake`);
        });
        it('should return status code 200 and a stake object', () => {
            expect(stakeResponse.status).toBe(200);
            expect(stakeResponse.data).toBeInstanceOf(Object);
        });
        it('should return the correct total number of validators', () => {
            expect(stakeResponse.data.totalValidators).toBeGreaterThanOrEqual(0);
        });
        it('should return the correct number of active validators', () => {
            expect(stakeResponse.data.activeValidators).toBeGreaterThanOrEqual(0);
        });
        it('should return the correct number of total observers', () => {
            expect(stakeResponse.data.totalObservers).toBeGreaterThanOrEqual(0);
        });
        it('should return the correct queue size', () => {
            expect(stakeResponse.data.queueSize).toBeGreaterThanOrEqual(0);
        });
        it('should return all expected properties in the response', () => {
            const expectedProperties = [
                'totalValidators',
                'activeValidators',
                'totalObservers',
                'queueSize',
                'totalStaked',
            ];
            for (const property of expectedProperties) {
                expect(stakeResponse.data).toHaveProperty(property);
            }
        });
    });
});
//# sourceMappingURL=stake.cs-e2e.js.map
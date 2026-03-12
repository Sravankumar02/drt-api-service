"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const env_config_1 = require("./config/env.config");
describe.skip('Delegation legacy e2e tests with chain simulator', () => {
    describe('GET /delegations-legacy', () => {
        it('should return status code 200 and a delegation legacy object details', async () => {
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/delegation-legacy`);
            const properties = Object.keys(response.data);
            expect(response.status).toBe(200);
            const expectedProperties = [
                'totalWithdrawOnlyStake',
                'totalWaitingStake',
                'totalActiveStake',
                'totalUnstakedStake',
                'totalDeferredPaymentStake',
                'numUsers',
            ];
            expect(properties).toEqual(expectedProperties);
        });
    });
});
//# sourceMappingURL=delegation-legacy.cs-e2e.js.map
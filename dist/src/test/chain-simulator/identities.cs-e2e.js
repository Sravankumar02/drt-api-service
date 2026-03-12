"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const env_config_1 = require("./config/env.config");
describe('Identities e2e tests with chain simulator', () => {
    describe('GET /identities', () => {
        it('should return status code 200 and a list of identities', async () => {
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/identities`);
            expect(response.status).toBe(200);
            expect(response.data).toBeInstanceOf(Array);
        });
        it('should support pagination', async () => {
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/identities?size=1`);
            expect(response.status).toBe(200);
            expect(response.data.length).toBe(1);
        });
        it('should return identities with expected properties', async () => {
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/identities`);
            expect(response.status).toBe(200);
            const expectedProps = [
                'locked',
                'distribution',
                'name',
                'score',
                'validators',
                'stake',
                'topUp',
                'stakePercent',
                'rank',
            ];
            for (const identity of response.data) {
                for (const expectedProp of expectedProps) {
                    expect(identity).toHaveProperty(expectedProp);
                }
            }
        });
    });
});
//# sourceMappingURL=identities.cs-e2e.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const env_config_1 = require("./config/env.config");
describe('Pool e2e tests with chain simulator', () => {
    describe('GET /pool', () => {
        it('should return status code 200', async () => {
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/pool`);
            const txsPool = response.data;
            expect(response.status).toBe(200);
            expect(txsPool).toBeInstanceOf(Array);
        });
        it('should return the transaction pool', async () => {
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/pool`);
            const pool = response.data;
            const expectedProperties = [
                'txHash',
                'nonce',
                'receiver',
                'gasPrice',
                'gasLimit',
            ];
            for (const tx of pool) {
                for (const property of expectedProperties) {
                    expect(tx).toHaveProperty(property);
                }
            }
        });
    });
    describe('GET /pool/:txhash', () => {
        it('should return status code 200 and the transaction', async () => {
            const poolResponse = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/pool?size=1`);
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/pool/${poolResponse.data[0].txHash}`);
            const tx = response.data;
            expect(response.status).toBe(200);
            expect(tx).toHaveProperty('txHash', poolResponse.data[0].txHash);
        });
        it('should return status code 404 for non-existent tx hash', async () => {
            const nonExistentTxHash = '0000000000000000000000000000000000000000000000000000000000000000';
            try {
                await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/pool/${nonExistentTxHash}`);
            }
            catch (error) {
                expect(error.response.status).toBe(404);
            }
        });
    });
});
//# sourceMappingURL=pool.cs-e2e.js.map
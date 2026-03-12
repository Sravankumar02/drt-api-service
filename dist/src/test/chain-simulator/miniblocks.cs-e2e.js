"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const env_config_1 = require("./config/env.config");
describe('Miniblocks e2e tests with chain simulator', () => {
    describe('GET /miniblocks', () => {
        it('should return status code 200', async () => {
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/miniblocks`);
            expect(response.status).toBe(200);
        });
        it('should handle invalid miniblock requests gracefully', async () => {
            try {
                await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/miniblocks/invalid`);
            }
            catch (error) {
                expect(error.response.status).toBe(400);
            }
        });
        it('should return a list of miniblocks', async () => {
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/miniblocks`);
            const miniblocks = response.data;
            expect(Array.isArray(miniblocks)).toBe(true);
            expect(miniblocks.length).toBeGreaterThan(5);
        });
        it('should return miniblocks with the correct structure', async () => {
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/miniblocks`);
            const miniblocks = response.data;
            const expectedProperties = [
                'miniBlockHash',
                'receiverShard',
                'senderShard',
                'timestamp',
                'type',
            ];
            for (const miniblock of miniblocks) {
                for (const property of expectedProperties) {
                    expect(miniblock).toHaveProperty(property);
                }
            }
        });
    });
    describe('GET /miniblocks filters', () => {
        it('should support pagination', async () => {
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/miniblocks?size=5`);
            const miniblocks = response.data;
            expect(miniblocks.length).toBe(5);
        });
        it('should support filtering by types', async () => {
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/miniblocks?type=SmartContractResultBlock`);
            const miniblocks = response.data;
            for (const miniblock of miniblocks) {
                expect(miniblock.type).toStrictEqual('SmartContractResultBlock');
            }
        });
        it('should support filtering by types', async () => {
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/miniblocks?type=InvalidBlock`);
            const miniblocks = response.data;
            for (const miniblock of miniblocks) {
                expect(miniblock.type).toStrictEqual('InvalidBlock');
            }
        });
        const typesToTest = ['SmartContractResultBlock', 'InvalidBlock', 'TxBlock'];
        for (const type of typesToTest) {
            it(`should return miniblocks filtered by type: ${type}`, async () => {
                const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/miniblocks?type=${type}`);
                const miniblocks = response.data;
                for (const miniblock of miniblocks) {
                    expect(miniblock.type).toStrictEqual(type);
                }
            });
        }
    });
});
//# sourceMappingURL=miniblocks.cs-e2e.js.map
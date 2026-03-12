"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const env_config_1 = require("./config/env.config");
describe('Dapp config e2e tests with chain simulator', () => {
    describe('GET /dapp/config', () => {
        it('should return status code 200 and dapp config', async () => {
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/dapp/config`);
            expect(response.status).toBe(200);
        });
        it('should return dapp config with all required properties', async () => {
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/dapp/config`);
            const dappConfig = response.data;
            const requiredProps = [
                'id',
                'name',
                'rewaLabel',
                'decimals',
                'rewaDenomination',
                'gasPerDataByte',
                'apiTimeout',
                'walletConnectDeepLink',
                'walletConnectBridgeAddresses',
                'walletAddress',
                'apiAddress',
                'explorerAddress',
                'chainId',
            ];
            for (const prop of requiredProps) {
                expect(dappConfig).toHaveProperty(prop);
            }
        });
    });
});
//# sourceMappingURL=dapp.config.cs-e2e.js.map
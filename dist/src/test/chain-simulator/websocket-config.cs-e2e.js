"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const env_config_1 = require("./config/env.config");
describe('Websocket config e2e tests with chain simulator', () => {
    describe('GET /websocket/config', () => {
        it('should return status code 200 and websocket config', async () => {
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/websocket/config`);
            expect(response.status).toBe(200);
            expect(response.data.url).toStrictEqual('socket-api-fra.dharitri.org');
        });
    });
});
//# sourceMappingURL=websocket-config.cs-e2e.js.map
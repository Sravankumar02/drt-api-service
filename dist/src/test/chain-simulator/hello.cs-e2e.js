"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const env_config_1 = require("./config/env.config");
describe('Hello endpoint e2e tests with chain simulator', () => {
    describe('GET /hello', () => {
        it('should return status code 200 and a hello message', async () => {
            const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/hello`);
            expect(response.status).toBe(200);
            expect(response.data).toBe('hello');
        });
    });
});
//# sourceMappingURL=hello.cs-e2e.js.map
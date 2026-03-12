"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const tslib_1 = require("tslib");
const dotenv = tslib_1.__importStar(require("dotenv"));
const path = tslib_1.__importStar(require("path"));
dotenv.config({
    path: path.resolve(__dirname, '.env'),
});
exports.config = {
    chainSimulatorUrl: process.env.CHAIN_SIMULATOR_URL || 'http://localhost:8085',
    apiServiceUrl: process.env.API_SERVICE_URL || 'http://localhost:3001',
    subscriptionsServiceUrl: process.env.SUBSCRIPTIONS_SERVICE_URL || 'http://localhost:6002',
    aliceAddress: process.env.ALICE_ADDRESS || 'drt1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssey5egf',
    bobAddress: process.env.BOB_ADDRESS || 'drt1spyavw0956vq68xj8y4tenjpq2wd5a9p2c6j8gsz7ztyrnpxrruqlqde3c',
};
//# sourceMappingURL=env.config.js.map
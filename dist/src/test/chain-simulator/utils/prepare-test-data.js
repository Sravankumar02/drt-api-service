"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = require("../config/env.config");
const chain_simulator_operations_1 = require("./chain.simulator.operations");
const test_utils_1 = require("./test.utils");
async function prepareTestData() {
    try {
        console.log('Starting test data preparation...');
        console.log('Waiting for epoch 2...');
        await test_utils_1.ChainSimulatorUtils.waitForEpoch(2);
        console.log('✓ Chain simulator reached epoch 2');
        await (0, chain_simulator_operations_1.fundAddress)(env_config_1.config.chainSimulatorUrl, env_config_1.config.aliceAddress);
        console.log('✓ Funded address');
        await (0, chain_simulator_operations_1.issueMultipleDcdts)(env_config_1.config.chainSimulatorUrl, env_config_1.config.aliceAddress, 5);
        console.log('✓ Issued DCDTs');
        await (0, chain_simulator_operations_1.issueMultipleNftsCollections)(env_config_1.config.chainSimulatorUrl, env_config_1.config.aliceAddress, 2, 5, 'both');
        console.log('✓ Issued NFT collections');
        await (0, chain_simulator_operations_1.issueMultipleMetaDCDTCollections)(env_config_1.config.chainSimulatorUrl, env_config_1.config.aliceAddress, 2, 5);
        console.log('✓ Issued Meta-DCDT collections');
        await test_utils_1.ChainSimulatorUtils.deployPingPongSc(env_config_1.config.aliceAddress);
        console.log('✓ Deployed PingPong smart contract');
        await new Promise((resolve) => setTimeout(resolve, 30000));
        console.log('Test data preparation completed successfully!');
    }
    catch (error) {
        console.error('Error preparing test data:', error);
        process.exit(1);
    }
}
void prepareTestData();
//# sourceMappingURL=prepare-test-data.js.map
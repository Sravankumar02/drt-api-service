"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainSimulatorUtils = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const env_config_1 = require("../config/env.config");
const chain_simulator_operations_1 = require("./chain.simulator.operations");
const chain_simulator_operations_2 = require("./chain.simulator.operations");
const chain_simulator_operations_3 = require("./chain.simulator.operations");
const fs_1 = tslib_1.__importDefault(require("fs"));
class ChainSimulatorUtils {
    static async waitForEpoch(targetEpoch = 2, maxRetries = 50) {
        try {
            await this.checkSimulatorHealth(maxRetries);
            let retries = 0;
            while (retries < maxRetries) {
                try {
                    const networkStatus = await axios_1.default.get(`${env_config_1.config.chainSimulatorUrl}/network/status/4294967295`);
                    const currentEpoch = networkStatus.data.drt_epoch_number;
                    if (currentEpoch >= targetEpoch) {
                        return true;
                    }
                    await axios_1.default.post(`${env_config_1.config.chainSimulatorUrl}/simulator/generate-blocks-until-epoch-reached/${targetEpoch}`, {});
                    const stats = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/stats`);
                    const newEpoch = stats.data.epoch;
                    if (newEpoch >= targetEpoch) {
                        return true;
                    }
                    retries++;
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
                catch (error) {
                    retries++;
                    if (retries >= maxRetries) {
                        throw new Error(`Failed to reach epoch ${targetEpoch} after ${maxRetries} retries`);
                    }
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
            throw new Error(`Failed to reach epoch ${targetEpoch} after ${maxRetries} retries`);
        }
        catch (error) {
            console.error('Error in waitForEpoch:', error);
            throw error;
        }
    }
    static async checkSimulatorHealth(maxRetries = 50) {
        let retries = 0;
        while (retries < maxRetries) {
            try {
                const response = await axios_1.default.get(`${env_config_1.config.chainSimulatorUrl}/simulator/observers`);
                if (response.status === 200) {
                    return true;
                }
            }
            catch (error) {
                retries++;
                if (retries >= maxRetries) {
                    throw new Error('Chain simulator not started or not responding!');
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        return false;
    }
    static async deployPingPongSc(deployer) {
        try {
            const contractCodeRaw = fs_1.default.readFileSync('./src/test/chain-simulator/utils/contracts/ping-pong-rewa.wasm');
            const contractArgs = [
                '0de0b6b3a7640000',
            ];
            await (0, chain_simulator_operations_2.fundAddress)(env_config_1.config.chainSimulatorUrl, deployer);
            const scAddress = await (0, chain_simulator_operations_3.deploySc)(new chain_simulator_operations_1.DeployScArgs({
                chainSimulatorUrl: env_config_1.config.chainSimulatorUrl,
                deployer: deployer,
                contractCodeRaw: contractCodeRaw,
                hexArguments: contractArgs,
            }));
            console.log(`Deployed ping pong SC. Address: ${scAddress} with deployer: ${deployer}`);
            return scAddress;
        }
        catch (error) {
            console.error('Error deploying ping pong SC:', error);
            throw error;
        }
    }
    static async pingContract(sender, scAddress) {
        await (0, chain_simulator_operations_1.sendTransaction)(new chain_simulator_operations_1.SendTransactionArgs({
            chainSimulatorUrl: env_config_1.config.chainSimulatorUrl,
            sender,
            receiver: scAddress,
            value: '1000000000000000000',
            dataField: 'ping',
        }));
    }
    static async pongContract(sender, scAddress) {
        await (0, chain_simulator_operations_1.sendTransaction)(new chain_simulator_operations_1.SendTransactionArgs({
            chainSimulatorUrl: env_config_1.config.chainSimulatorUrl,
            sender,
            receiver: scAddress,
            dataField: 'pong',
        }));
    }
}
exports.ChainSimulatorUtils = ChainSimulatorUtils;
//# sourceMappingURL=test.utils.js.map
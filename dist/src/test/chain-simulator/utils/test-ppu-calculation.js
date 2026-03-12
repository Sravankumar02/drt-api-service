"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const env_config_1 = require("../config/env.config");
const chain_simulator_operations_1 = require("./chain.simulator.operations");
const test_utils_1 = require("./test.utils");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
async function testPpuCalculation() {
    try {
        console.log('Starting PPU calculation test...');
        console.log('Waiting for epoch 2...');
        await test_utils_1.ChainSimulatorUtils.waitForEpoch(2);
        console.log('✓ Chain simulator reached epoch 2');
        const addresses = {
            shard0: env_config_1.config.aliceAddress,
            shard1: env_config_1.config.bobAddress,
        };
        for (const [shardName, address] of Object.entries(addresses)) {
            await (0, chain_simulator_operations_1.fundAddress)(env_config_1.config.chainSimulatorUrl, address);
            console.log(`✓ Funded address for ${shardName}: ${address}`);
        }
        const pingPongAddress = await deployPingPongSmartContract(addresses.shard0);
        console.log(`✓ Deployed PingPong smart contract at address: ${pingPongAddress}`);
        const stopMonitoring = startContinuousPpuMonitoring();
        try {
            await createContinuousCongestion(addresses, pingPongAddress);
        }
        finally {
            stopMonitoring();
        }
        console.log('\nWaiting for final transactions to be processed...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        await getFinalPpuReport();
        console.log('\nPPU calculation test completed successfully!');
    }
    catch (error) {
        console.error('Error testing PPU calculation:', error);
        process.exit(1);
    }
}
async function deployPingPongSmartContract(deployerAddress) {
    console.log('Deploying PingPong smart contract...');
    const scAddress = await test_utils_1.ChainSimulatorUtils.deployPingPongSc(deployerAddress);
    await new Promise(resolve => setTimeout(resolve, 3000));
    return scAddress;
}
function startContinuousPpuMonitoring() {
    let shouldContinue = true;
    const monitor = async () => {
        while (shouldContinue) {
            for (let shardId = 0; shardId <= 2; shardId++) {
                try {
                    const response = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/transactions/ppu/${shardId}`);
                    const ppuData = response.data;
                    if (ppuData.Fast > 0 || ppuData.Faster > 0) {
                        const timestamp = new Date().toISOString();
                        console.log(`\nDetected PPU activity in shard ${shardId} at ${timestamp}:`);
                        console.log(`- Last Block: ${ppuData.LastBlock}`);
                        console.log(`- Fast PPU: ${ppuData.Fast}`);
                        console.log(`- Faster PPU: ${ppuData.Faster}`);
                        const activityReport = {
                            timestamp,
                            shardId,
                            lastBlock: ppuData.LastBlock,
                            fastPpu: ppuData.Fast,
                            fasterPpu: ppuData.Faster,
                            totalTransactions: 0,
                        };
                        const poolResponse = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/pool?senderShard=${shardId}&size=10000`);
                        const transactions = poolResponse.data;
                        if (transactions.length > 0) {
                            const networkResponse = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/constants`);
                            const { minGasLimit, gasPerDataByte, gasPriceModifier } = networkResponse.data;
                            const ppuValues = transactions.map((tx) => {
                                const data = tx.data ? sdk_nestjs_common_1.BinaryUtils.base64Decode(tx.data) : '';
                                const gasLimit = Number(tx.gasLimit);
                                const gasPrice = Number(tx.gasPrice);
                                const dataCost = minGasLimit + data.length * gasPerDataByte;
                                const executionCost = gasLimit - dataCost;
                                const initiallyPaidFee = dataCost * gasPrice + executionCost * gasPrice * Number(gasPriceModifier);
                                return Math.floor(initiallyPaidFee / gasLimit);
                            });
                            const sortedPpuValues = [...ppuValues].sort((a, b) => b - a);
                            const fastIndex = Math.floor(transactions.length * 0.2);
                            const fasterIndex = Math.floor(transactions.length * 0.1);
                            console.log(`\nMempool Analysis for shard ${shardId}:`);
                            console.log(`- Total transactions: ${transactions.length}`);
                            console.log(`- Calculated Fast PPU (20th percentile): ${sortedPpuValues[fastIndex]}`);
                            console.log(`- Calculated Faster PPU (10th percentile): ${sortedPpuValues[fasterIndex]}`);
                            const fastDiff = ppuData.Fast > 0 ? Math.abs(ppuData.Fast - sortedPpuValues[fastIndex]) / ppuData.Fast : 0;
                            const fasterDiff = ppuData.Faster > 0 ? Math.abs(ppuData.Faster - sortedPpuValues[fasterIndex]) / ppuData.Faster : 0;
                            console.log(`- Fast PPU difference: ${(fastDiff * 100).toFixed(2)}%`);
                            console.log(`- Faster PPU difference: ${(fasterDiff * 100).toFixed(2)}%`);
                            activityReport.totalTransactions = transactions.length;
                            activityReport.mempoolAnalysis = {
                                calculatedFastPpu: sortedPpuValues[fastIndex],
                                calculatedFasterPpu: sortedPpuValues[fasterIndex],
                                fastPpuDifference: fastDiff,
                                fasterPpuDifference: fasterDiff,
                                transactionCount: transactions.length,
                            };
                            const reportsDir = path.join(__dirname, '../../../reports/ppu-activity');
                            if (!fs.existsSync(reportsDir)) {
                                fs.mkdirSync(reportsDir, { recursive: true });
                            }
                            const safeTimestamp = timestamp.replace(/[:.]/g, '-');
                            const filename = path.join(reportsDir, `ppu-activity-shard-${shardId}-${safeTimestamp}.json`);
                            fs.writeFileSync(filename, JSON.stringify(activityReport, null, 2));
                            console.log(`\nActivity report saved to: ${filename}`);
                        }
                    }
                }
                catch (error) {
                    console.error(`Error monitoring PPU for shard ${shardId}:`, error);
                }
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    };
    void monitor();
    return () => {
        shouldContinue = false;
    };
}
function calculatePpuDifference(actualPpu, calculatedPpu) {
    if (actualPpu === 0 || calculatedPpu === 0) {
        return 0;
    }
    const relativeDiff = Math.abs(actualPpu - calculatedPpu) / Math.max(actualPpu, calculatedPpu);
    return relativeDiff;
}
async function getFinalPpuReport(batchNumber) {
    const reportData = {
        timestamp: new Date().toISOString(),
        batchNumber: batchNumber || 0,
        shards: {},
    };
    console.log('\n=== PPU Report' + (batchNumber ? ` after batch ${batchNumber}` : '') + ' ===');
    for (let shardId = 0; shardId <= 2; shardId++) {
        try {
            console.log(`\nShard ${shardId}:`);
            console.log('------------------------');
            const ppuResponse = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/transactions/ppu/${shardId}`);
            const ppuData = ppuResponse.data;
            const poolResponse = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/pool?senderShard=${shardId}&size=10000`);
            const transactions = poolResponse.data;
            reportData.shards[shardId] = {
                lastBlock: ppuData.LastBlock,
                fastPpu: ppuData.Fast,
                fasterPpu: ppuData.Faster,
                totalTransactions: transactions.length,
            };
            console.log(`Last Block: ${ppuData.LastBlock}`);
            console.log(`Fast PPU: ${ppuData.Fast}`);
            console.log(`Faster PPU: ${ppuData.Faster}`);
            console.log(`Total transactions in mempool: ${transactions.length}`);
            if (transactions.length > 0) {
                const networkResponse = await axios_1.default.get(`${env_config_1.config.apiServiceUrl}/constants`);
                const { minGasLimit, gasPerDataByte, gasPriceModifier } = networkResponse.data;
                const ppuValues = transactions.map((tx) => {
                    const data = tx.data ? sdk_nestjs_common_1.BinaryUtils.base64Decode(tx.data) : '';
                    const gasLimit = Number(tx.gasLimit);
                    const gasPrice = Number(tx.gasPrice);
                    const dataCost = minGasLimit + data.length * gasPerDataByte;
                    const executionCost = gasLimit - dataCost;
                    const initiallyPaidFee = dataCost * gasPrice + executionCost * gasPrice * Number(gasPriceModifier);
                    return Math.floor(initiallyPaidFee / gasLimit);
                });
                const sortedPpuValues = [...ppuValues].sort((a, b) => b - a);
                const fastIndex = Math.floor(transactions.length * 0.2);
                const fasterIndex = Math.floor(transactions.length * 0.1);
                console.log('\nPPU Distribution:');
                console.log(`Highest PPU: ${sortedPpuValues[0]}`);
                console.log(`Calculated Fast PPU (20th percentile): ${sortedPpuValues[fastIndex]}`);
                console.log(`Calculated Faster PPU (10th percentile): ${sortedPpuValues[fasterIndex]}`);
                console.log(`Lowest PPU: ${sortedPpuValues[sortedPpuValues.length - 1]}`);
                reportData.shards[shardId].ppuDistribution = {
                    highest: sortedPpuValues[0],
                    fast: sortedPpuValues[fastIndex],
                    faster: sortedPpuValues[fasterIndex],
                    lowest: sortedPpuValues[sortedPpuValues.length - 1],
                };
                const fastDiff = calculatePpuDifference(ppuData.Fast, sortedPpuValues[fastIndex]);
                const fasterDiff = calculatePpuDifference(ppuData.Faster, sortedPpuValues[fasterIndex]);
                console.log('\nPPU Analysis:');
                console.log(`Fast PPU from API: ${ppuData.Fast}`);
                console.log(`Fast PPU calculated (20th percentile): ${sortedPpuValues[fastIndex]}`);
                console.log(`Fast PPU difference: ${(fastDiff * 100).toFixed(2)}%`);
                console.log(`\nFaster PPU from API: ${ppuData.Faster}`);
                console.log(`Faster PPU calculated (10th percentile): ${sortedPpuValues[fasterIndex]}`);
                console.log(`Faster PPU difference: ${(fasterDiff * 100).toFixed(2)}%`);
                if (fastDiff > 0.1 || fasterDiff > 0.1) {
                    console.log('\n⚠️ Warning: Large PPU difference detected!');
                    console.log('This might indicate:');
                    console.log('1. High mempool congestion');
                    console.log('2. Rapid changes in gas prices');
                    console.log('3. Potential calculation discrepancies');
                }
                reportData.shards[shardId].validation = {
                    fastDiff: fastDiff,
                    fasterDiff: fasterDiff,
                };
                const scTransactions = transactions.filter((tx) => tx.data && sdk_nestjs_common_1.BinaryUtils.base64Decode(tx.data).startsWith('ping')).length;
                const regularTransactions = transactions.length - scTransactions;
                console.log('\nTransaction Distribution:');
                console.log(`Regular transactions: ${regularTransactions}`);
                console.log(`Smart Contract transactions: ${scTransactions}`);
                reportData.shards[shardId].transactionDistribution = {
                    regular: regularTransactions,
                    smartContract: scTransactions,
                };
            }
        }
        catch (error) {
            console.error(`Error getting final report for shard ${shardId}:`, error);
        }
    }
    const reportsDir = path.join(__dirname, '../../../reports');
    if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = path.join(reportsDir, `ppu-report-${batchNumber ? `batch-${batchNumber}-` : ''}${timestamp}.json`);
    fs.writeFileSync(filename, JSON.stringify(reportData, null, 2));
    console.log(`\nReport saved to: ${filename}`);
    return reportData;
}
async function createContinuousCongestion(addresses, pingPongAddress) {
    console.log('Starting continuous congestion generation...');
    let batchNumber = 1;
    const gasPrices = [
        1000000000,
        2000000000,
        3000000000,
        5000000000,
        7000000000,
        10000000000,
        15000000000,
        20000000000,
    ];
    const dataSizes = [
        '',
        'small data field',
        'a'.repeat(100),
        'a'.repeat(500),
        'a'.repeat(1000),
        'a'.repeat(2000),
        'a'.repeat(5000),
        'a'.repeat(10000),
    ];
    const scCalls = [
        'ping',
        'ping@01',
        'ping@0123456789',
        'ping@' + 'a'.repeat(100),
        'ping@' + 'a'.repeat(500),
        'ping@' + 'a'.repeat(1000),
    ];
    const scGasLimits = [
        150000000,
        200000000,
        300000000,
        400000000,
    ];
    while (batchNumber <= 4) {
        console.log(`\nCreating transaction batch ${batchNumber}...`);
        for (const [, sender] of Object.entries(addresses)) {
            for (const gasPrice of gasPrices) {
                for (const dataField of dataSizes) {
                    for (const receiver of Object.values(addresses)) {
                        if (sender !== receiver) {
                            const repeatCount = gasPrice >= 10000000000 ? 3 : 1;
                            for (let i = 0; i < repeatCount; i++) {
                                await (0, chain_simulator_operations_1.sendTransaction)(new chain_simulator_operations_1.SendTransactionArgs({
                                    chainSimulatorUrl: env_config_1.config.chainSimulatorUrl,
                                    sender: sender,
                                    receiver: receiver,
                                    dataField: dataField,
                                    value: '1000000000000000000',
                                    gasLimit: 50000000 + (dataField.length * 1500),
                                    nonceOffset: Math.floor(Math.random() * 5),
                                    gasPrice: gasPrice.toString(),
                                }));
                            }
                        }
                    }
                }
            }
            for (const gasPrice of gasPrices) {
                for (const scCall of scCalls) {
                    for (const gasLimit of scGasLimits) {
                        const repeatCount = gasPrice >= 10000000000 ? 3 : 1;
                        for (let i = 0; i < repeatCount; i++) {
                            await (0, chain_simulator_operations_1.sendTransaction)(new chain_simulator_operations_1.SendTransactionArgs({
                                chainSimulatorUrl: env_config_1.config.chainSimulatorUrl,
                                sender: sender,
                                receiver: pingPongAddress,
                                dataField: scCall,
                                value: '1000000000000000000',
                                gasLimit: gasLimit,
                                nonceOffset: Math.floor(Math.random() * 5),
                                gasPrice: gasPrice.toString(),
                            }));
                        }
                    }
                }
            }
        }
        console.log(`✓ Batch ${batchNumber} created`);
        console.log('\nGenerating report for this batch...');
        await getFinalPpuReport(batchNumber);
        console.log('\nWaiting for transactions to be processed before next batch...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        batchNumber++;
    }
}
void testPpuCalculation();
//# sourceMappingURL=test-ppu-calculation.js.map
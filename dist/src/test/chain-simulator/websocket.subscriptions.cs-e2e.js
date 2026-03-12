"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const env_config_1 = require("./config/env.config");
const chain_simulator_operations_1 = require("./utils/chain.simulator.operations");
const socket_io_client_1 = require("socket.io-client");
const test_utils_1 = require("./utils/test.utils");
const WS_SERVER_URL = `${env_config_1.config.subscriptionsServiceUrl}`;
const verbose = false;
const client4SubscriptionConfig = {
    pool: { from: 0, size: 25 },
    events: { from: 0, size: 25, shard: 1 },
    transactions: { from: 0, size: 25, status: 'success' },
    blocks: { from: 0, size: 25, shard: 1 },
};
const log = (...args) => {
    if (verbose) {
        console.log(...args);
    }
};
const txResponses = new Map();
const eventResponses = new Map();
const transferResponses = new Map();
const generalResponses = {
    pool: [],
    events: [],
    transactions: [],
    blocks: [],
    stats: [],
};
const txFilters = {
    CLIENT_1: { sender: env_config_1.config.aliceAddress },
    CLIENT_2: { sender: env_config_1.config.bobAddress },
    CLIENT_3: { sender: env_config_1.config.aliceAddress, receiver: env_config_1.config.bobAddress },
};
const eventFilters = {
    CLIENT_1: { identifier: 'pong' },
    CLIENT_2: { address: '' },
    CLIENT_3: { identifier: 'completedTxEvent', address: '' },
};
const transferFilters = {
    CLIENT_5: { address: env_config_1.config.aliceAddress },
    CLIENT_6: { token: 'REWA', address: env_config_1.config.aliceAddress },
    CLIENT_7: { token: '' },
};
const filterKeys = {
    CLIENT_1: "KEY_CLIENT_1",
    CLIENT_2: "KEY_CLIENT_2",
    CLIENT_3: "KEY_CLIENT_3",
    CLIENT_5: "KEY_CLIENT_5_ADDR",
    CLIENT_6: "KEY_CLIENT_6_REWA",
    CLIENT_7: "KEY_CLIENT_7_DCDT",
};
const filterMap = [
    { key: filterKeys.CLIENT_1, txFilter: txFilters.CLIENT_1, eventFilter: eventFilters.CLIENT_1, transferFilter: null, clientId: "client1" },
    { key: filterKeys.CLIENT_2, txFilter: txFilters.CLIENT_2, eventFilter: eventFilters.CLIENT_2, transferFilter: null, clientId: "client2" },
    { key: filterKeys.CLIENT_3, txFilter: txFilters.CLIENT_3, eventFilter: eventFilters.CLIENT_3, transferFilter: null, clientId: "client3" },
    { key: filterKeys.CLIENT_5, txFilter: null, eventFilter: null, transferFilter: transferFilters.CLIENT_5, clientId: "client5_addr" },
    { key: filterKeys.CLIENT_6, txFilter: null, eventFilter: null, transferFilter: transferFilters.CLIENT_6, clientId: "client6_rewa" },
    { key: filterKeys.CLIENT_7, txFilter: null, eventFilter: null, transferFilter: transferFilters.CLIENT_7, clientId: "client7_dcdt" },
];
let pingPongScAddress = '';
const aliceDcdts = [];
describe('Websocket subscriptions e2e tests', () => {
    const clients = [];
    const connectAndSubscribe = (filterKey, txFilter, eventFilter, transferFilter, clientId) => {
        const receivedTxs = [];
        const receivedEvents = [];
        const receivedTransfers = [];
        txResponses.set(filterKey, receivedTxs);
        eventResponses.set(filterKey, receivedEvents);
        transferResponses.set(filterKey, receivedTransfers);
        const client = (0, socket_io_client_1.io)(WS_SERVER_URL, {
            path: '/ws/subscription',
        });
        clients.push(client);
        client.on("connect_error", (err) => {
            throw new Error(`${clientId} connection failed: ${err.message}`);
        });
        client.on("customTransactionUpdate", (data) => {
            log(`\n💸 ${clientId} received ${data.transactions.length} txs`);
            receivedTxs.push(...data.transactions);
        });
        client.on("customEventUpdate", (data) => {
            log(`\n🔔 ${clientId} received ${data.events.length} events`);
            receivedEvents.push(...data.events);
        });
        client.on("customTransferUpdate", (data) => {
            log(`\n💎 ${clientId} received ${data.transfers.length} transfers`);
            receivedTransfers.push(...data.transfers);
        });
        client.on("connect", () => {
            log(`\n   ${clientId} connected.`);
            if (txFilter) {
                client.emit("subscribeCustomTransactions", txFilter, (ack) => log(`   ACK TXs ${clientId}:`, ack));
            }
            if (eventFilter) {
                client.emit("subscribeCustomEvents", eventFilter, (ack) => log(`   ACK Events ${clientId}:`, ack));
            }
            if (transferFilter) {
                client.emit("subscribeCustomTransfers", transferFilter, (ack) => log(`   ACK Transfers ${clientId}:`, ack));
            }
        });
    };
    const connectAndSubscribeGeneral = (clientId, subConfig) => {
        const client = (0, socket_io_client_1.io)(WS_SERVER_URL, {
            path: '/ws/subscription',
        });
        clients.push(client);
        client.on("connect_error", (err) => { throw new Error(`${clientId} connection failed: ${err.message}`); });
        client.on("poolUpdate", (data) => generalResponses.pool.push(data));
        client.on("eventsUpdate", (data) => generalResponses.events.push(data));
        client.on("transactionUpdate", (data) => generalResponses.transactions.push(data));
        client.on("blocksUpdate", (data) => generalResponses.blocks.push(data));
        client.on("statsUpdate", (data) => generalResponses.stats.push(data));
        client.on("connect", () => {
            log(`\n   ${clientId} connected with specific configs.`);
            client.emit("subscribePool", subConfig.pool, (ack) => log(`ACK Pool ${clientId}:`, ack));
            client.emit("subscribeEvents", subConfig.events, (ack) => log(`ACK Events ${clientId}:`, ack));
            client.emit("subscribeTransactions", subConfig.transactions, (ack) => log(`ACK Txs ${clientId}:`, ack));
            client.emit("subscribeBlocks", subConfig.blocks, (ack) => log(`ACK Blocks ${clientId}:`, ack));
            client.emit("subscribeStats", (ack) => log(`ACK Stats ${clientId}:`, ack));
        });
    };
    beforeAll(async () => {
        try {
            await (0, chain_simulator_operations_1.fundAddress)(env_config_1.config.chainSimulatorUrl, env_config_1.config.aliceAddress);
            await (0, chain_simulator_operations_1.fundAddress)(env_config_1.config.chainSimulatorUrl, env_config_1.config.bobAddress);
            await axios_1.default.post(`${env_config_1.config.chainSimulatorUrl}/simulator/generate-blocks/1`);
            pingPongScAddress = await test_utils_1.ChainSimulatorUtils.deployPingPongSc(env_config_1.config.bobAddress);
            eventFilters.CLIENT_2.address = pingPongScAddress;
            eventFilters.CLIENT_3.address = pingPongScAddress;
            log("Issuing DCDT Token...");
            const newAliceDcdts = await (0, chain_simulator_operations_1.issueMultipleDcdts)(env_config_1.config.chainSimulatorUrl, env_config_1.config.aliceAddress, 1);
            aliceDcdts.push(...newAliceDcdts);
            await axios_1.default.post(`${env_config_1.config.chainSimulatorUrl}/simulator/generate-blocks/10`);
            for (const item of filterMap) {
                if (item.key === filterKeys.CLIENT_7) {
                    item.transferFilter = { token: aliceDcdts[0] };
                }
                connectAndSubscribe(item.key, item.txFilter, item.eventFilter, item.transferFilter, item.clientId);
            }
            connectAndSubscribeGeneral("client4", client4SubscriptionConfig);
            await new Promise(resolve => setTimeout(resolve, 10000));
            log("\n--- Starting Operations ---");
            await (0, chain_simulator_operations_1.transferRewa)(env_config_1.config.chainSimulatorUrl, env_config_1.config.aliceAddress, env_config_1.config.bobAddress, 1);
            await (0, chain_simulator_operations_1.transferRewa)(env_config_1.config.chainSimulatorUrl, env_config_1.config.bobAddress, env_config_1.config.aliceAddress, 2);
            await test_utils_1.ChainSimulatorUtils.pingContract(env_config_1.config.aliceAddress, pingPongScAddress);
            await test_utils_1.ChainSimulatorUtils.pongContract(env_config_1.config.aliceAddress, pingPongScAddress);
            await (0, chain_simulator_operations_1.transferDcdt)({
                chainSimulatorUrl: env_config_1.config.chainSimulatorUrl,
                sender: env_config_1.config.aliceAddress,
                receiver: env_config_1.config.bobAddress,
                tokenIdentifier: aliceDcdts[0],
                plainAmountOfTokens: 1,
            });
            await axios_1.default.post(`${env_config_1.config.chainSimulatorUrl}/simulator/generate-blocks/10`);
            log("Waiting for WS messages...");
            await new Promise(resolve => setTimeout(resolve, 20000));
        }
        catch (e) {
            console.error("Error in beforeAll:", e.message);
            throw e;
        }
    });
    afterAll(() => {
        clients.forEach(client => client.connected && client.disconnect());
    });
    it('should receive TXs sent by Alice for Client 1', () => {
        const txs = txResponses.get(filterKeys.CLIENT_1);
        expect(txs === null || txs === void 0 ? void 0 : txs.length).toBe(4);
        txs === null || txs === void 0 ? void 0 : txs.forEach((tx) => {
            expect(tx.sender).toEqual(env_config_1.config.aliceAddress);
        });
    });
    it('should receive Events with identifier "pong" for Client 1', () => {
        const events = eventResponses.get(filterKeys.CLIENT_1);
        expect(events === null || events === void 0 ? void 0 : events.length).toBe(1);
        events === null || events === void 0 ? void 0 : events.forEach((evt) => {
            expect(evt.identifier).toEqual('pong');
        });
    });
    it('should receive TXs sent by Bob for Client 2', () => {
        const txs = txResponses.get(filterKeys.CLIENT_2);
        expect(txs === null || txs === void 0 ? void 0 : txs.length).toBe(1);
        txs === null || txs === void 0 ? void 0 : txs.forEach((tx) => {
            expect(tx.sender).toEqual(env_config_1.config.bobAddress);
        });
    });
    it('should receive Events generated by PingPong contract (address) for Client 2', () => {
        const events = eventResponses.get(filterKeys.CLIENT_2);
        expect(events === null || events === void 0 ? void 0 : events.length).toBe(6);
        events === null || events === void 0 ? void 0 : events.forEach((evt) => {
            expect(evt.address).toEqual(pingPongScAddress);
        });
    });
    it('should receive specific Alice-to-Bob TXs for Client 3', () => {
        const txs = txResponses.get(filterKeys.CLIENT_3);
        expect(txs === null || txs === void 0 ? void 0 : txs.length).toBeGreaterThanOrEqual(1);
        txs === null || txs === void 0 ? void 0 : txs.forEach((tx) => {
            expect(tx.sender).toEqual(env_config_1.config.aliceAddress);
            expect(tx.receiver).toEqual(env_config_1.config.bobAddress);
        });
    });
    it('should receive ANY transfer involving Alice (Client 5 - Address Filter)', () => {
        const transfers = transferResponses.get(filterKeys.CLIENT_5);
        expect(transfers === null || transfers === void 0 ? void 0 : transfers.length).toBeGreaterThan(0);
        transfers === null || transfers === void 0 ? void 0 : transfers.forEach(t => {
            const isAliceInvolved = t.sender === env_config_1.config.aliceAddress || t.receiver === env_config_1.config.aliceAddress;
            expect(isAliceInvolved).toBe(true);
        });
    });
    it('should receive ONLY REWA transfers where ALICE is involved (Client 6 - Token REWA Filter)', () => {
        const transfers = transferResponses.get(filterKeys.CLIENT_6);
        expect(transfers === null || transfers === void 0 ? void 0 : transfers.length).toBeGreaterThan(0);
        transfers === null || transfers === void 0 ? void 0 : transfers.forEach(t => {
            const val1 = `1${'0'.repeat(18)}`;
            const val2 = `2${'0'.repeat(18)}`;
            expect([val1, val2]).toContain(t.value);
            const isAliceInvolved = t.sender === env_config_1.config.aliceAddress ||
                t.receiver === env_config_1.config.aliceAddress ||
                t.relayer === env_config_1.config.aliceAddress;
            expect(isAliceInvolved).toBe(true);
        });
    });
    it('should receive ONLY specific DCDT transfers (Client 7 - Dynamic Token Filter)', () => {
        const transfers = transferResponses.get(filterKeys.CLIENT_7);
        expect(transfers === null || transfers === void 0 ? void 0 : transfers.length).toBeGreaterThan(0);
        transfers === null || transfers === void 0 ? void 0 : transfers.forEach(t => {
            var _a, _b;
            const dcdtTransfers = (_b = (_a = t.action) === null || _a === void 0 ? void 0 : _a.arguments) === null || _b === void 0 ? void 0 : _b.transfers;
            const containsAliceDcdt = dcdtTransfers.filter((et) => et.token === aliceDcdts[0]).length > 0;
            expect(containsAliceDcdt).toBe(true);
        });
    });
    it('should receive Blocks updates for Client 4', () => {
        expect(generalResponses.blocks.length).toBeGreaterThan(0);
    });
    it('should receive Transactions updates for Client 4', () => {
        expect(generalResponses.transactions.length).toBeGreaterThan(0);
    });
    it('should receive Events updates for Client 4', () => {
        expect(generalResponses.events.length).toBeGreaterThan(0);
    });
    it('should receive Stats updates for Client 4', () => {
        expect(generalResponses.stats.length).toBeGreaterThan(0);
    });
    it('should have valid subscription structure for Pool updates', () => {
        expect(Array.isArray(generalResponses.pool)).toBe(true);
    });
});
//# sourceMappingURL=websocket.subscriptions.cs-e2e.js.map
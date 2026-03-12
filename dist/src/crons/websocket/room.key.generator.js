"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomKeyGenerator = void 0;
const events_custom_subscribe_1 = require("../../endpoints/events/entities/events.custom.subscribe");
const transaction_custom_subscribe_1 = require("../../endpoints/transactions/entities/dtos/transaction.custom.subscribe");
const transfers_custom_payload_1 = require("../../endpoints/websocket/entities/transfers.custom.payload");
class RoomKeyGenerator {
    static generate(prefix, data, dtoClass) {
        const allowedKeys = this.getKeys(dtoClass);
        const activeFilters = this.collectActiveFilters(allowedKeys, data);
        if (activeFilters.length === 0) {
            return [];
        }
        return this.buildRoomKeys(prefix, activeFilters);
    }
    static collectActiveFilters(allowedKeys, data) {
        const activeFilters = [];
        for (const key of allowedKeys) {
            if (key === 'token') {
                this.addTokenFilters(activeFilters, data);
                continue;
            }
            const value = data[key];
            if (this.isValidFilterValue(value)) {
                activeFilters.push({ key, value });
            }
        }
        return activeFilters;
    }
    static addTokenFilters(activeFilters, data) {
        var _a, _b;
        const value = data['value'];
        if (this.isValidFilterValue(value) && value !== '0') {
            activeFilters.push({ key: 'token', value: 'REWA' });
        }
        const transfers = (_b = (_a = data === null || data === void 0 ? void 0 : data.action) === null || _a === void 0 ? void 0 : _a.arguments) === null || _b === void 0 ? void 0 : _b.transfers;
        if (!Array.isArray(transfers)) {
            return;
        }
        for (const transfer of transfers) {
            if (this.isValidFilterValue(transfer === null || transfer === void 0 ? void 0 : transfer.token)) {
                activeFilters.push({ key: 'token', value: transfer.token });
            }
        }
    }
    static isValidFilterValue(value) {
        return value !== undefined && value !== null && value !== '';
    }
    static buildRoomKeys(prefix, activeFilters) {
        const rooms = [];
        const subsetCount = 1 << activeFilters.length;
        for (let mask = 1; mask < subsetCount; mask++) {
            const currentSubset = {};
            let skipIteration = false;
            for (let bit = 0; bit < activeFilters.length; bit++) {
                if ((mask & (1 << bit)) > 0) {
                    if (currentSubset.hasOwnProperty(activeFilters[bit].key)) {
                        skipIteration = true;
                        continue;
                    }
                    const item = activeFilters[bit];
                    currentSubset[item.key] = item.value;
                }
            }
            if (!skipIteration) {
                rooms.push(`${prefix}${this.deterministicStringify(currentSubset)}`);
            }
        }
        return rooms;
    }
    static deterministicStringify(obj) {
        return JSON.stringify(Object.keys(obj)
            .sort()
            .reduce((result, key) => {
            result[key] = obj[key];
            return result;
        }, {}));
    }
    static getKeys(targetClass) {
        switch (targetClass) {
            case transaction_custom_subscribe_1.TransactionCustomSubscribePayload:
                return transaction_custom_subscribe_1.TransactionCustomSubscribePayload.getClassFields();
            case events_custom_subscribe_1.EventsCustomSubscribePayload:
                return events_custom_subscribe_1.EventsCustomSubscribePayload.getClassFields();
            case transfers_custom_payload_1.TransferCustomSubscribePayload:
                return transfers_custom_payload_1.TransferCustomSubscribePayload.getClassFields();
            default:
                console.warn(`RoomKeyGenerator: No manual key mapping found for class ${targetClass.name}`);
                return [];
        }
    }
}
exports.RoomKeyGenerator = RoomKeyGenerator;
//# sourceMappingURL=room.key.generator.js.map
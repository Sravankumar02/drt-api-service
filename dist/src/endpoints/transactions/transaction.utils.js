"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionUtils = void 0;
const transaction_operation_action_1 = require("./entities/transaction.operation.action");
require("@sravankumar02/sdk-nestjs-common/lib/utils/extensions/array.extensions");
const sdk_nestjs_elastic_1 = require("@sravankumar02/sdk-nestjs-elastic");
class TransactionUtils {
    static isTransactionCountQueryWithAddressOnly(filter, address) {
        if (!address) {
            return false;
        }
        const filterToCompareWith = {};
        return JSON.stringify(filter) === JSON.stringify(filterToCompareWith);
    }
    static isTransactionCountQueryWithSenderAndReceiver(filter) {
        if (!filter.sender || !filter.receivers) {
            return false;
        }
        if (!filter.receivers.includes(filter.sender)) {
            return false;
        }
        const filterToCompareWith = {
            sender: filter.sender,
            receivers: filter.receivers,
            condition: sdk_nestjs_elastic_1.QueryConditionOptions.should,
        };
        return JSON.stringify(filter) === JSON.stringify(filterToCompareWith);
    }
    static trimOperations(sender, operations, previousHashes) {
        let result = [];
        for (const operation of operations) {
            if (operation.action === transaction_operation_action_1.TransactionOperationAction.transfer) {
                const identicalOperations = operations.filter(x => x.sender === operation.sender &&
                    x.receiver === operation.receiver &&
                    x.collection === operation.collection &&
                    x.identifier === operation.identifier &&
                    x.type === operation.type &&
                    x.value === operation.value &&
                    x.action === transaction_operation_action_1.TransactionOperationAction.transfer &&
                    x.id === previousHashes[operation.id]);
                if (identicalOperations.length > 0) {
                    continue;
                }
            }
            result.push(operation);
        }
        result = result.sorted(x => x.sender === sender ? 0 : 1);
        return result;
    }
}
exports.TransactionUtils = TransactionUtils;
//# sourceMappingURL=transaction.utils.js.map
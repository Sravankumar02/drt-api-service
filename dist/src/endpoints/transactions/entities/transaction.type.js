"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = void 0;
const graphql_1 = require("@nestjs/graphql");
var TransactionType;
(function (TransactionType) {
    TransactionType["Transaction"] = "Transaction";
    TransactionType["SmartContractResult"] = "SmartContractResult";
    TransactionType["Reward"] = "Reward";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
(0, graphql_1.registerEnumType)(TransactionType, {
    name: 'TransactionType',
    description: 'Transaction type object type.',
    valuesMap: {
        Transaction: {
            description: 'Transaction type.',
        },
        SmartContractResult: {
            description: 'SmartContractResult type.',
        },
        Reward: {
            description: 'Reward type.',
        },
    },
});
//# sourceMappingURL=transaction.type.js.map
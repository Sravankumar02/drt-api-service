"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionOperationType = void 0;
const graphql_1 = require("@nestjs/graphql");
var TransactionOperationType;
(function (TransactionOperationType) {
    TransactionOperationType["none"] = "none";
    TransactionOperationType["nft"] = "nft";
    TransactionOperationType["dcdt"] = "dcdt";
    TransactionOperationType["log"] = "log";
    TransactionOperationType["error"] = "error";
    TransactionOperationType["rewa"] = "rewa";
})(TransactionOperationType = exports.TransactionOperationType || (exports.TransactionOperationType = {}));
(0, graphql_1.registerEnumType)(TransactionOperationType, {
    name: 'TransactionOperationType',
    description: 'Transaction operation type object type.',
    valuesMap: {
        none: {
            description: 'No operation type.',
        },
        nft: {
            description: 'NFT operation type.',
        },
        dcdt: {
            description: 'DCDT operation type.',
        },
        log: {
            description: 'Log operation type.',
        },
        error: {
            description: 'Error operation type.',
        },
        rewa: {
            description: 'REWA operation type.',
        },
    },
});
//# sourceMappingURL=transaction.operation.type.js.map
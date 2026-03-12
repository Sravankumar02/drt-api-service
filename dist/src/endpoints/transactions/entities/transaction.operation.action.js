"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionOperationAction = void 0;
const graphql_1 = require("@nestjs/graphql");
var TransactionOperationAction;
(function (TransactionOperationAction) {
    TransactionOperationAction["none"] = "none";
    TransactionOperationAction["transfer"] = "transfer";
    TransactionOperationAction["transferValueOnly"] = "transferValueOnly";
    TransactionOperationAction["burn"] = "burn";
    TransactionOperationAction["addQuantity"] = "addQuantity";
    TransactionOperationAction["create"] = "create";
    TransactionOperationAction["localMint"] = "localMint";
    TransactionOperationAction["localBurn"] = "localBurn";
    TransactionOperationAction["wipe"] = "wipe";
    TransactionOperationAction["freeze"] = "freeze";
    TransactionOperationAction["writeLog"] = "writeLog";
    TransactionOperationAction["signalError"] = "signalError";
})(TransactionOperationAction = exports.TransactionOperationAction || (exports.TransactionOperationAction = {}));
(0, graphql_1.registerEnumType)(TransactionOperationAction, {
    name: 'TransactionOperationAction',
    description: 'Transaction operation action object type.',
    valuesMap: {
        none: {
            description: 'No operation operation action.',
        },
        transfer: {
            description: 'Transafer operation action.',
        },
        transferValueOnly: {
            description: 'Transfer only value operation action.',
        },
        burn: {
            description: 'Burn operation action.',
        },
        addQuantity: {
            description: 'Add quantity operation action.',
        },
        create: {
            description: 'Create operation action.',
        },
        localMint: {
            description: 'Local mint operation action.',
        },
        localBurn: {
            description: 'Local burn operation action.',
        },
        wipe: {
            description: 'Wipe operation action.',
        },
        freeze: {
            description: 'Freeze operation action.',
        },
        writeLog: {
            description: 'Write log operation action.',
        },
        signalError: {
            description: 'Signal error operation action.',
        },
    },
});
//# sourceMappingURL=transaction.operation.action.js.map
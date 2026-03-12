"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["success"] = "success";
    TransactionStatus["pending"] = "pending";
    TransactionStatus["invalid"] = "invalid";
    TransactionStatus["fail"] = "fail";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
(0, graphql_1.registerEnumType)(TransactionStatus, {
    name: 'TransactionStatus',
    description: 'Transaction status object type.',
    valuesMap: {
        success: {
            description: 'Success status.',
        },
        pending: {
            description: 'Pending status.',
        },
        invalid: {
            description: 'Invalid status.',
        },
        fail: {
            description: 'Fail status.',
        },
    },
});
//# sourceMappingURL=transaction.status.js.map
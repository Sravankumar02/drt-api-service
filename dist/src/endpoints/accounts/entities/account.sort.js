"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSort = void 0;
const graphql_1 = require("@nestjs/graphql");
var AccountSort;
(function (AccountSort) {
    AccountSort["balance"] = "balance";
    AccountSort["timestamp"] = "timestamp";
    AccountSort["transfersLast24h"] = "transfersLast24h";
})(AccountSort = exports.AccountSort || (exports.AccountSort = {}));
(0, graphql_1.registerEnumType)(AccountSort, {
    name: 'AccountSort',
    description: 'Account Sort object.',
    valuesMap: {
        balance: {
            description: 'Sort by balance.',
        },
        timestamp: {
            description: 'Sort by timestamp.',
        },
        transfersLast24h: {
            description: 'Sort by transfersLast24h.',
        },
    },
});
//# sourceMappingURL=account.sort.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSort = void 0;
const graphql_1 = require("@nestjs/graphql");
var TokenSort;
(function (TokenSort) {
    TokenSort["accounts"] = "accounts";
    TokenSort["transactions"] = "transactions";
    TokenSort["price"] = "price";
    TokenSort["marketCap"] = "marketCap";
})(TokenSort = exports.TokenSort || (exports.TokenSort = {}));
(0, graphql_1.registerEnumType)(TokenSort, {
    name: 'TokenSort',
    description: 'Token Sort object type.',
    valuesMap: {
        accounts: {
            description: 'Accounts sort.',
        },
        transactions: {
            description: 'Transactions sort.',
        },
        price: {
            description: 'Price sort.',
        },
        marketCap: {
            description: 'MarketCap sort.',
        },
    },
});
//# sourceMappingURL=token.sort.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaPairExchange = void 0;
const graphql_1 = require("@nestjs/graphql");
var MoaPairExchange;
(function (MoaPairExchange) {
    MoaPairExchange["dharitrix"] = "dharitrix";
    MoaPairExchange["unknown"] = "unknown";
})(MoaPairExchange = exports.MoaPairExchange || (exports.MoaPairExchange = {}));
(0, graphql_1.registerEnumType)(MoaPairExchange, {
    name: 'MoaPairExchange',
    description: 'MoaPairExchange object type.',
    valuesMap: {
        dharitrix: {
            description: 'dharitrix',
        },
        unknown: {
            description: 'unknown',
        },
    },
});
//# sourceMappingURL=moa.pair.exchange.js.map
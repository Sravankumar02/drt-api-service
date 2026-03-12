"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniBlockType = void 0;
const graphql_1 = require("@nestjs/graphql");
var MiniBlockType;
(function (MiniBlockType) {
    MiniBlockType["SmartContractResultBlock"] = "SmartContractResultBlock";
    MiniBlockType["TxBlock"] = "TxBlock";
    MiniBlockType["InvalidBlock"] = "InvalidBlock";
})(MiniBlockType = exports.MiniBlockType || (exports.MiniBlockType = {}));
(0, graphql_1.registerEnumType)(MiniBlockType, {
    name: 'MiniBlockType',
    description: 'MiniBlock Type object.',
    valuesMap: {
        SmartContractResultBlock: {
            description: 'SmartContractResultBlock.',
        },
        TxBlock: {
            description: 'TxBlock.',
        },
        InvalidBlock: {
            description: 'InvalidBlock.',
        },
    },
});
//# sourceMappingURL=mini.block.type.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenType = void 0;
const graphql_1 = require("@nestjs/graphql");
var TokenType;
(function (TokenType) {
    TokenType["FungibleDCDT"] = "FungibleDCDT";
    TokenType["MetaDCDT"] = "MetaDCDT";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
(0, graphql_1.registerEnumType)(TokenType, {
    name: 'TokenType',
    description: 'Token type enum.',
    valuesMap: {
        FungibleDCDT: {
            description: 'Fungible DCDT token type.',
        },
        MetaDCDT: {
            description: 'Meta DCDT token type.',
        },
    },
});
//# sourceMappingURL=token.type.js.map
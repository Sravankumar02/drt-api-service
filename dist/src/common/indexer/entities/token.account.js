"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenType = void 0;
const graphql_1 = require("@nestjs/graphql");
var TokenType;
(function (TokenType) {
    TokenType["FungibleDCDT"] = "FungibleDCDT";
    TokenType["NonFungibleDCDT"] = "NonFungibleDCDT";
    TokenType["SemiFungibleDCDT"] = "SemiFungibleDCDT";
    TokenType["MetaDCDT"] = "MetaDCDT";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
(0, graphql_1.registerEnumType)(TokenType, {
    name: 'TokenType',
    description: 'Token Type object.',
    valuesMap: {
        FungibleDCDT: {
            description: 'FungibleDCDT.',
        },
        NonFungibleDCDT: {
            description: 'NonFungibleDCDT.',
        },
        SemiFungibleDCDT: {
            description: 'SemiFungibleDCDT.',
        },
        MetaDCDT: {
            description: 'MetaDCDT.',
        },
    },
});
//# sourceMappingURL=token.account.js.map
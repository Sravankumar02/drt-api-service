"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAssetsPriceSourceType = void 0;
const graphql_1 = require("@nestjs/graphql");
var TokenAssetsPriceSourceType;
(function (TokenAssetsPriceSourceType) {
    TokenAssetsPriceSourceType["dataApi"] = "dataApi";
    TokenAssetsPriceSourceType["customUrl"] = "customUrl";
})(TokenAssetsPriceSourceType = exports.TokenAssetsPriceSourceType || (exports.TokenAssetsPriceSourceType = {}));
(0, graphql_1.registerEnumType)(TokenAssetsPriceSourceType, {
    name: 'TokenAssetsPriceSourceType',
    description: 'Token Assets Price Source Type object type.',
    valuesMap: {
        dataApi: {
            description: 'Data API type.',
        },
        customUrl: {
            description: 'Custom URL to fetch price.',
        },
    },
});
//# sourceMappingURL=token.assets.price.source.type.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAssetStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var TokenAssetStatus;
(function (TokenAssetStatus) {
    TokenAssetStatus["active"] = "active";
    TokenAssetStatus["inactive"] = "inactive";
})(TokenAssetStatus = exports.TokenAssetStatus || (exports.TokenAssetStatus = {}));
(0, graphql_1.registerEnumType)(TokenAssetStatus, {
    name: 'TokenAssetStatus',
    description: 'Token asset status object type.',
    valuesMap: {
        active: {
            description: 'Active asset status.',
        },
        inactive: {
            description: 'Inactive asset status.',
        },
    },
});
//# sourceMappingURL=token.asset.status.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DcdtDataSource = void 0;
const graphql_1 = require("@nestjs/graphql");
var DcdtDataSource;
(function (DcdtDataSource) {
    DcdtDataSource["gateway"] = "gateway";
    DcdtDataSource["elastic"] = "elastic";
})(DcdtDataSource = exports.DcdtDataSource || (exports.DcdtDataSource = {}));
(0, graphql_1.registerEnumType)(DcdtDataSource, {
    name: 'DcdtDataSource',
    description: 'DCDT data source.',
    valuesMap: {
        gateway: {
            description: 'Gateway data source.',
        },
        elastic: {
            description: 'Elastic data source.',
        },
    },
});
//# sourceMappingURL=dcdt.data.source.js.map
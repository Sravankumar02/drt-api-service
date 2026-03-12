"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeType = void 0;
const graphql_1 = require("@nestjs/graphql");
var NodeType;
(function (NodeType) {
    NodeType["observer"] = "observer";
    NodeType["validator"] = "validator";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
(0, graphql_1.registerEnumType)(NodeType, {
    name: 'NodeType',
    description: 'Node Type object.',
    valuesMap: {
        observer: {
            description: 'Observer type.',
        },
        validator: {
            description: 'Validator type.',
        },
    },
});
//# sourceMappingURL=node.type.js.map
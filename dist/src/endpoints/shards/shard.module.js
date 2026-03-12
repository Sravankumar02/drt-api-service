"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShardModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const protocol_module_1 = require("../../common/protocol/protocol.module");
const node_module_1 = require("../nodes/node.module");
const shard_service_1 = require("./shard.service");
let ShardModule = class ShardModule {
};
ShardModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            node_module_1.NodeModule,
            protocol_module_1.ProtocolModule,
        ],
        providers: [
            shard_service_1.ShardService,
        ],
        exports: [
            shard_service_1.ShardService,
        ],
    })
], ShardModule);
exports.ShardModule = ShardModule;
//# sourceMappingURL=shard.module.js.map
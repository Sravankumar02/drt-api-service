"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodesInfos = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class NodesInfos {
    constructor(init) {
        this.numNodes = 0;
        this.stake = '';
        this.topUp = '';
        this.locked = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of nodes', type: Number, example: 10 }),
    tslib_1.__metadata("design:type", Number)
], NodesInfos.prototype, "numNodes", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of stake', type: Number, example: 100 }),
    tslib_1.__metadata("design:type", String)
], NodesInfos.prototype, "stake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of topUp', type: Number, example: 100 }),
    tslib_1.__metadata("design:type", String)
], NodesInfos.prototype, "topUp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Locked number', type: Number, example: 100 }),
    tslib_1.__metadata("design:type", String)
], NodesInfos.prototype, "locked", void 0);
exports.NodesInfos = NodesInfos;
//# sourceMappingURL=nodes.infos.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundDetailed = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const round_1 = require("./round");
class RoundDetailed extends round_1.Round {
    constructor(init) {
        super();
        this.signers = [];
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Signers', type: String, isArray: true }),
    tslib_1.__metadata("design:type", Array)
], RoundDetailed.prototype, "signers", void 0);
exports.RoundDetailed = RoundDetailed;
//# sourceMappingURL=round.detailed.js.map
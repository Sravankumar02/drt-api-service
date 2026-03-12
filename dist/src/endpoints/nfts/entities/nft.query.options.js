"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftQueryOptions = void 0;
const common_1 = require("@nestjs/common");
class NftQueryOptions {
    constructor(init) {
        Object.assign(this, init);
        if (this.withAssets === undefined) {
            this.withAssets = true;
        }
    }
    validate(size) {
        if (this.withReceivedAt && size > 25) {
            throw new common_1.BadRequestException('withReceivedAt can only be used with a size of 25');
        }
    }
}
exports.NftQueryOptions = NftQueryOptions;
//# sourceMappingURL=nft.query.options.js.map
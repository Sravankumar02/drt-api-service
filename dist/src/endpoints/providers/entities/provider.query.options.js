"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderQueryOptions = void 0;
const common_1 = require("@nestjs/common");
class ProviderQueryOptions {
    constructor(init) {
        this.withLatestInfo = false;
        this.withIdentityInfo = false;
        Object.assign(this, init);
    }
    static applyDefaultOptions(owner, options) {
        if (options.withLatestInfo === true && !owner) {
            throw new common_1.BadRequestException(`'withLatestInfo' can only be activated when an 'owner' filter is also applied.`);
        }
        return options;
    }
}
exports.ProviderQueryOptions = ProviderQueryOptions;
//# sourceMappingURL=provider.query.options.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountQueryOptions = void 0;
const common_1 = require("@nestjs/common");
class AccountQueryOptions {
    constructor(init) {
        Object.assign(this, init);
    }
    validate(size) {
        if (this.withDeployInfo && size > 25) {
            throw new common_1.BadRequestException('Size must be less than or equal to 25 when withDeployInfo is set');
        }
        if (this.withTxCount && size > 25) {
            throw new common_1.BadRequestException('Size must be less than or equal to 25 when withTxCount is set');
        }
        if (this.withScrCount && size > 25) {
            throw new common_1.BadRequestException('Size must be less than or equal to 25 when withScrCount is set');
        }
        if (this.addresses && this.addresses.length > 25) {
            throw new common_1.BadRequestException('Addresses array must contain 25 or fewer elements');
        }
    }
    isSet() {
        return this.ownerAddress !== undefined ||
            this.sort !== undefined ||
            this.order !== undefined ||
            this.isSmartContract !== undefined ||
            this.withOwnerAssets !== undefined ||
            this.withDeployInfo !== undefined ||
            this.name !== undefined ||
            this.tags !== undefined ||
            this.excludeTags !== undefined ||
            this.hasAssets !== undefined ||
            this.search !== undefined ||
            this.addresses !== undefined ||
            this.withBalance !== undefined;
    }
}
exports.AccountQueryOptions = AccountQueryOptions;
//# sourceMappingURL=account.query.options.js.map
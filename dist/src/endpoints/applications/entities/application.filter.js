"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationFilter = void 0;
const common_1 = require("@nestjs/common");
class ApplicationFilter {
    constructor(init) {
        Object.assign(this, init);
    }
    validate(size) {
        if (this.withTxCount && size > 25) {
            throw new common_1.BadRequestException('Size must be less than or equal to 25 when withTxCount is set');
        }
    }
    isSet() {
        return this.after !== undefined ||
            this.before !== undefined ||
            this.withTxCount !== undefined;
    }
}
exports.ApplicationFilter = ApplicationFilter;
//# sourceMappingURL=application.filter.js.map
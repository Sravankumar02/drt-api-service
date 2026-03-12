"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampParsePipe = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../common/api-config/api.config.service");
const time_utils_1 = require("./time.utils");
let TimestampParsePipe = class TimestampParsePipe {
    constructor(apiConfigService) {
        this.apiConfigService = apiConfigService;
    }
    transform(value) {
        if (value === undefined || value === null)
            return undefined;
        const valNumber = parseInt(value, 10);
        if (isNaN(valNumber)) {
            throw new common_1.BadRequestException('Timestamp must be a number');
        }
        if (valNumber <= 0) {
            throw new common_1.BadRequestException('Timestamp must be a positive number');
        }
        const normalizedInputMs = time_utils_1.TimeUtils.isTimestampInSeconds(valNumber) ? valNumber * 1000 : valNumber;
        if (!this.apiConfigService.isChainBarnardEnabled()) {
            return Math.floor(normalizedInputMs / 1000);
        }
        const barnardActivationTimestamp = this.apiConfigService.getChainBarnardActivationTimestamp() * 1000;
        if (normalizedInputMs < barnardActivationTimestamp) {
            return Math.floor(normalizedInputMs / 1000);
        }
        else {
            return normalizedInputMs;
        }
    }
};
TimestampParsePipe = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService])
], TimestampParsePipe);
exports.TimestampParsePipe = TimestampParsePipe;
//# sourceMappingURL=timestamp.parse.pipe.js.map
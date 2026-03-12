"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSService = void 0;
const tslib_1 = require("tslib");
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../../../../common/api-config/api.config.service");
let AWSService = class AWSService {
    constructor(apiConfigService) {
        this.apiConfigService = apiConfigService;
    }
    async uploadToS3(path, buffer, type) {
        const s3 = new client_s3_1.S3({
            credentials: {
                accessKeyId: this.apiConfigService.getAwsS3KeyId(),
                secretAccessKey: this.apiConfigService.getAwsS3Secret(),
            },
            region: this.apiConfigService.getAwsS3Region(),
            endpoint: this.apiConfigService.getAwsS3Endpoint(),
        });
        await s3.putObject({
            Bucket: this.apiConfigService.getAwsS3Bucket(),
            Key: path,
            Body: buffer,
            ContentType: type,
            ACL: "public-read",
        });
        return this.getItemPath(path);
    }
    getItemPath(path) {
        return `https://${this.apiConfigService.getAwsS3Bucket()}/${path}`;
    }
};
AWSService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService])
], AWSService);
exports.AWSService = AWSService;
//# sourceMappingURL=aws.service.js.map
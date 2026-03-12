"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.About = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const feature_configs_1 = require("./feature.configs");
class About {
    constructor(init) {
        this.appVersion = undefined;
        this.pluginsVersion = undefined;
        this.network = '';
        this.cluster = '';
        this.version = '';
        this.indexerVersion = undefined;
        this.gatewayVersion = undefined;
        this.scamEngineVersion = undefined;
        this.features = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], About.prototype, "appVersion", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], About.prototype, "pluginsVersion", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], About.prototype, "network", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    tslib_1.__metadata("design:type", String)
], About.prototype, "cluster", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], About.prototype, "version", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", Object)
], About.prototype, "indexerVersion", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", Object)
], About.prototype, "gatewayVersion", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], About.prototype, "scamEngineVersion", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: feature_configs_1.FeatureConfigs, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], About.prototype, "features", void 0);
exports.About = About;
//# sourceMappingURL=about.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const elastic_indexer_module_1 = require("../../common/indexer/elastic/elastic.indexer.module");
const application_service_1 = require("./application.service");
const assets_service_1 = require("../../common/assets/assets.service");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const transfer_module_1 = require("../transfers/transfer.module");
let ApplicationModule = class ApplicationModule {
};
ApplicationModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            elastic_indexer_module_1.ElasticIndexerModule,
            transfer_module_1.TransferModule,
        ],
        providers: [
            application_service_1.ApplicationService,
            assets_service_1.AssetsService,
            gateway_service_1.GatewayService,
        ],
        exports: [
            application_service_1.ApplicationService,
        ],
    })
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=application.module.js.map
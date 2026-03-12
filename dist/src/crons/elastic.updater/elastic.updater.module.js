"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticUpdaterModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const assets_module_1 = require("../../common/assets/assets.module");
const persistence_module_1 = require("../../common/persistence/persistence.module");
const endpoints_services_module_1 = require("../../endpoints/endpoints.services.module");
const elastic_updater_service_1 = require("./elastic.updater.service");
let ElasticUpdaterModule = class ElasticUpdaterModule {
};
ElasticUpdaterModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            endpoints_services_module_1.EndpointsServicesModule,
            assets_module_1.AssetsModule,
            (0, common_1.forwardRef)(() => persistence_module_1.PersistenceModule),
        ],
        providers: [
            elastic_updater_service_1.ElasticUpdaterService,
        ],
    })
], ElasticUpdaterModule);
exports.ElasticUpdaterModule = ElasticUpdaterModule;
//# sourceMappingURL=elastic.updater.module.js.map
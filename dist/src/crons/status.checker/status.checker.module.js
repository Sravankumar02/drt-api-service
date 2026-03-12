"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCheckerModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const elastic_indexer_service_1 = require("../../common/indexer/elastic/elastic.indexer.service");
const endpoints_services_module_1 = require("../../endpoints/endpoints.services.module");
const dynamic_module_utils_1 = require("../../utils/dynamic.module.utils");
const status_checker_service_1 = require("./status.checker.service");
let StatusCheckerModule = class StatusCheckerModule {
};
StatusCheckerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            endpoints_services_module_1.EndpointsServicesModule,
        ],
        providers: [
            dynamic_module_utils_1.DynamicModuleUtils.getPubSubService(),
            status_checker_service_1.StatusCheckerService,
            elastic_indexer_service_1.ElasticIndexerService,
        ],
    })
], StatusCheckerModule);
exports.StatusCheckerModule = StatusCheckerModule;
//# sourceMappingURL=status.checker.module.js.map
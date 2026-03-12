"use strict";
var IndexerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const elastic_indexer_module_1 = require("./elastic/elastic.indexer.module");
const elastic_indexer_service_1 = require("./elastic/elastic.indexer.service");
const indexer_service_1 = require("./indexer.service");
let IndexerModule = IndexerModule_1 = class IndexerModule {
    static register() {
        return {
            module: IndexerModule_1,
            imports: [
                elastic_indexer_module_1.ElasticIndexerModule,
            ],
            providers: [
                {
                    provide: 'IndexerInterface',
                    useClass: elastic_indexer_service_1.ElasticIndexerService,
                },
                indexer_service_1.IndexerService,
            ],
            exports: ['IndexerInterface', indexer_service_1.IndexerService],
        };
    }
};
IndexerModule = IndexerModule_1 = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], IndexerModule);
exports.IndexerModule = IndexerModule;
//# sourceMappingURL=indexer.module.js.map
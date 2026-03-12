"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let PluginService = class PluginService {
    async processTransactions(_transactions, _withScamInfo) { }
    async processTransactionSend(_transaction) { }
    async processAccount(_account) { }
    async bootstrapPublicApp(_application) { }
    async batchProcessNfts(_nfts, _withScamInfo) { }
    async processAbout(_about) { }
    formatTokenSupply(_identifier, _dcdtSupply) { }
};
PluginService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PluginService);
exports.PluginService = PluginService;
//# sourceMappingURL=plugin.service.js.map
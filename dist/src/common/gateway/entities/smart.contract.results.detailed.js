"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewaySmartContractResults = void 0;
const smart_contract_result_1 = require("../../../endpoints/sc-results/entities/smart.contract.result");
class GatewaySmartContractResults extends smart_contract_result_1.SmartContractResult {
    constructor(init) {
        super();
        this.tokens = [];
        this.dcdtValues = [];
        this.receivers = [];
        this.receiversShardIDs = [];
        this.operation = '';
        Object.assign(this, init);
    }
}
exports.GatewaySmartContractResults = GatewaySmartContractResults;
//# sourceMappingURL=smart.contract.results.detailed.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractResultController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const smart_contract_result_1 = require("./entities/smart.contract.result");
const scresult_service_1 = require("./scresult.service");
const query_pagination_1 = require("../../common/entities/query.pagination");
const smart_contract_result_filter_1 = require("./entities/smart.contract.result.filter");
const parse_array_options_1 = require("@sravankumar02/sdk-nestjs-common/lib/pipes/entities/parse.array.options");
const smart_contract_result_options_1 = require("./entities/smart.contract.result.options");
let SmartContractResultController = class SmartContractResultController {
    constructor(scResultService) {
        this.scResultService = scResultService;
    }
    getScResults(from, size, miniBlockHash, originalTxHashes, sender, receiver, functions, withActionTransferValue) {
        return this.scResultService.getScResults(new query_pagination_1.QueryPagination({ from, size }), new smart_contract_result_filter_1.SmartContractResultFilter({ miniBlockHash, originalTxHashes, sender, receiver, functions }), new smart_contract_result_options_1.SmartContractResultOptions({ withActionTransferValue }));
    }
    getScResultsCount(sender, receiver, functions) {
        return this.scResultService.getScResultsCount(new smart_contract_result_filter_1.SmartContractResultFilter({ sender, receiver, functions }));
    }
    async getScResult(scHash) {
        const scResult = await this.scResultService.getScResult(scHash);
        if (!scResult) {
            throw new common_1.NotFoundException('Smart contract result not found');
        }
        return scResult;
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/results"),
    (0, swagger_1.ApiOperation)({ summary: 'Smart contract results', description: 'Returns all smart contract results available on the blockchain' }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'miniBlockHash', description: 'The hash of the parent miniBlock', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'originalTxHashes', description: 'Original transaction hashes', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Sender address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Receiver address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'function', description: 'Filter results by function name', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withActionTransferValue', description: 'Returns value in USD and REWA for transferred tokens within the action attribute', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: [smart_contract_result_1.SmartContractResult] }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('miniBlockHash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__param(3, (0, common_1.Query)('originalTxHashes', sdk_nestjs_common_1.ParseArrayPipe, sdk_nestjs_common_1.ParseTransactionHashPipe)),
    tslib_1.__param(4, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(5, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(6, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__param(7, (0, common_1.Query)('withActionTransferValue', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Array, String, String, Array, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], SmartContractResultController.prototype, "getScResults", null);
tslib_1.__decorate([
    (0, common_1.Get)("/results/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Smart contracts count', description: 'Returns total number of smart contracts results' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Sender address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'receiver', description: 'Receiver address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'function', description: 'Filter results by function name', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('receiver', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(2, (0, common_1.Query)('function', new sdk_nestjs_common_1.ParseArrayPipe(new parse_array_options_1.ParseArrayPipeOptions({ allowEmptyString: true })))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], SmartContractResultController.prototype, "getScResultsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/results/:scHash"),
    (0, swagger_1.ApiOperation)({ summary: 'Smart contract results details', description: 'Returns smart contract details for a given hash' }),
    (0, swagger_1.ApiOkResponse)({ type: smart_contract_result_1.SmartContractResult }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Smart contract result not found' }),
    tslib_1.__param(0, (0, common_1.Param)('scHash', sdk_nestjs_common_1.ParseTransactionHashPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], SmartContractResultController.prototype, "getScResult", null);
SmartContractResultController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('results'),
    tslib_1.__metadata("design:paramtypes", [scresult_service_1.SmartContractResultService])
], SmartContractResultController);
exports.SmartContractResultController = SmartContractResultController;
//# sourceMappingURL=scresult.controller.js.map
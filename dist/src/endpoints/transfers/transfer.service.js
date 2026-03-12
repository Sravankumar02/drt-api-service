"use strict";
var TransferService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const transaction_type_1 = require("../transactions/entities/transaction.type");
const transaction_service_1 = require("../transactions/transaction.service");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const transaction_detailed_1 = require("../transactions/entities/transaction.detailed");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
let TransferService = TransferService_1 = class TransferService {
    constructor(indexerService, transactionService) {
        this.indexerService = indexerService;
        this.transactionService = transactionService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(TransferService_1.name);
    }
    sortElasticTransfers(elasticTransfers) {
        const transactionMap = new Map();
        for (const transfer of elasticTransfers) {
            if (transfer.txHash) {
                transactionMap.set(transfer.txHash, transfer);
            }
        }
        for (const elasticTransfer of elasticTransfers) {
            if (elasticTransfer.originalTxHash) {
                const transaction = transactionMap.get(elasticTransfer.originalTxHash);
                if (transaction) {
                    elasticTransfer.order = (transaction.nonce * 10) + 1;
                }
                else {
                    elasticTransfer.order = 0;
                }
            }
            else {
                elasticTransfer.order = elasticTransfer.nonce * 10;
            }
        }
        return elasticTransfers.sortedDescending((item) => item.timestamp, (item) => item.order);
    }
    async sortElasticTransfersByTxsOrder(elasticTransfers, miniBlockHash) {
        if (!miniBlockHash) {
            return this.sortElasticTransfers(elasticTransfers);
        }
        try {
            const block = await this.indexerService.getBlockByMiniBlockHash(miniBlockHash);
            if (!block || !block.miniBlocksDetails) {
                return this.sortElasticTransfers(elasticTransfers);
            }
            const miniBlockDetails = block.miniBlocksDetails.find((mb) => {
                var _a;
                const miniBlockIndex = (_a = block.miniBlocksHashes) === null || _a === void 0 ? void 0 : _a.indexOf(miniBlockHash);
                return miniBlockIndex !== -1 && mb.mbIndex === miniBlockIndex;
            });
            if (!miniBlockDetails || !miniBlockDetails.executionOrderTxsIndices || !miniBlockDetails.txsHashes) {
                return this.sortElasticTransfers(elasticTransfers);
            }
            const txHashToOrder = {};
            for (let i = 0; i < miniBlockDetails.txsHashes.length; i++) {
                const txHash = miniBlockDetails.txsHashes[i];
                const executionIndex = miniBlockDetails.executionOrderTxsIndices[i];
                txHashToOrder[txHash] = executionIndex;
            }
            const txHashToTransfer = {};
            for (const transfer of elasticTransfers) {
                if (transfer.txHash) {
                    txHashToTransfer[transfer.txHash] = transfer;
                }
            }
            for (const elasticTransfer of elasticTransfers) {
                const txHash = elasticTransfer.originalTxHash || elasticTransfer.txHash;
                if (txHashToOrder.hasOwnProperty(txHash)) {
                    elasticTransfer.order = txHashToOrder[txHash];
                }
                else {
                    if (elasticTransfer.originalTxHash) {
                        const transaction = txHashToTransfer[elasticTransfer.originalTxHash];
                        if (transaction) {
                            elasticTransfer.order = (transaction.nonce * 10) + 1;
                        }
                        else {
                            elasticTransfer.order = 0;
                        }
                    }
                    else {
                        elasticTransfer.order = elasticTransfer.nonce * 10;
                    }
                }
            }
            return elasticTransfers.sortedDescending((item) => -item.order, (item) => item.timestamp);
        }
        catch (error) {
            this.logger.error(`Error getting block execution order: ${error}`);
            return this.sortElasticTransfers(elasticTransfers);
        }
    }
    async getTransfers(filter, pagination, queryOptions, fields) {
        var _a, _b, _c;
        let elasticOperations = await this.indexerService.getTransfers(filter, pagination);
        if (queryOptions.withTxsOrder && filter.miniBlockHash) {
            elasticOperations = await this.sortElasticTransfersByTxsOrder(elasticOperations, filter.miniBlockHash);
        }
        else {
            elasticOperations = this.sortElasticTransfers(elasticOperations);
        }
        let transactions = [];
        for (const elasticOperation of elasticOperations) {
            const transaction = sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_detailed_1.TransactionDetailed(), elasticOperation);
            transaction.type = elasticOperation.type === 'normal' ? transaction_type_1.TransactionType.Transaction : transaction_type_1.TransactionType.SmartContractResult;
            if (elasticOperation.relayer) {
                transaction.relayer = elasticOperation.relayer;
                transaction.isRelayed = true;
            }
            else {
                transaction.relayer = elasticOperation.relayerAddr;
            }
            if (transaction.type === transaction_type_1.TransactionType.SmartContractResult) {
                delete transaction.gasLimit;
                delete transaction.gasPrice;
                delete transaction.gasUsed;
                delete transaction.nonce;
                delete transaction.round;
            }
            transactions.push(transaction);
        }
        const hasSenderFilter = filter.sender || (filter.senders && filter.senders.length > 0);
        const hasReceiverFilter = filter.receivers && filter.receivers.length > 0;
        if (filter.address && !hasSenderFilter && !hasReceiverFilter) {
            transactions = this.transactionService.reorderAccountSentTransactionsByNonce(transactions, filter.address);
        }
        if (queryOptions.withBlockInfo || (fields && fields.includesSome(['senderBlockHash', 'receiverBlockHash', 'senderBlockNonce', 'receiverBlockNonce']))) {
            await this.transactionService.applyBlockInfo(transactions);
        }
        if (queryOptions && (queryOptions.withOperations || queryOptions.withLogs)) {
            queryOptions.withScResultLogs = queryOptions.withLogs;
            transactions = await this.transactionService.getExtraDetailsForTransactions(elasticOperations, transactions, queryOptions);
        }
        await this.transactionService.processTransactions(transactions, {
            withScamInfo: (_a = queryOptions.withScamInfo) !== null && _a !== void 0 ? _a : false,
            withUsername: (_b = queryOptions.withUsername) !== null && _b !== void 0 ? _b : false,
            withActionTransferValue: (_c = queryOptions.withActionTransferValue) !== null && _c !== void 0 ? _c : false,
        });
        this.transactionService.processRelayedInfo(transactions);
        return transactions;
    }
    async getTransfersCount(filter) {
        return await this.indexerService.getTransfersCount(filter);
    }
};
TransferService = TransferService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => transaction_service_1.TransactionService))),
    tslib_1.__metadata("design:paramtypes", [indexer_service_1.IndexerService,
        transaction_service_1.TransactionService])
], TransferService);
exports.TransferService = TransferService;
//# sourceMappingURL=transfer.service.js.map
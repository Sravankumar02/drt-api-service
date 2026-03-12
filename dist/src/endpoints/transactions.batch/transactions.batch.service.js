"use strict";
var TransactionsBatchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsBatchService = void 0;
const tslib_1 = require("tslib");
const out_1 = require("@terradharitri/sdk-core/out");
const signature_1 = require("@terradharitri/sdk-core/out/signature");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const transaction_batch_1 = require("./entities/transaction.batch");
const transaction_batch_status_1 = require("./entities/transaction.batch.status");
const batch_transaction_status_1 = require("./entities/batch.transaction.status");
const transaction_batch_group_1 = require("./entities/transaction.batch.group");
const transaction_batch_item_1 = require("./entities/transaction.batch.item");
const transaction_1 = require("./entities/transaction");
const transaction_batch_simplified_result_1 = require("./entities/transaction.batch.simplified.result");
const cache_info_1 = require("../../utils/cache.info");
const transaction_service_1 = require("../transactions/transaction.service");
const transaction_create_1 = require("../transactions/entities/transaction.create");
let TransactionsBatchService = TransactionsBatchService_1 = class TransactionsBatchService {
    constructor(cachingService, transactionService) {
        this.cachingService = cachingService;
        this.transactionService = transactionService;
        this.logger = new common_1.Logger(TransactionsBatchService_1.name);
    }
    async startTransactionBatch(batch, sourceIp) {
        var _a;
        if (batch.groups.length === 0) {
            return batch;
        }
        for (const group of batch.groups) {
            for (const item of group.items) {
                const tx = item.transaction.tx;
                const trans = new out_1.Transaction({
                    nonce: tx.nonce,
                    value: tx.value,
                    receiver: new out_1.Address(tx.receiver),
                    gasPrice: tx.gasPrice,
                    gasLimit: tx.gasLimit,
                    data: tx.data ? new out_1.TransactionPayload(sdk_nestjs_common_1.BinaryUtils.base64Decode((_a = tx.data) !== null && _a !== void 0 ? _a : '')) : undefined,
                    chainID: tx.chainID,
                    version: new out_1.TransactionVersion(tx.version),
                    options: tx.options ? new out_1.TransactionOptions(tx.options) : undefined,
                    guardian: tx.guardian ? new out_1.Address(tx.guardian) : undefined,
                    sender: new out_1.Address(tx.sender),
                });
                if (tx.guardianSignature) {
                    trans.applyGuardianSignature(new signature_1.Signature(tx.guardianSignature));
                }
                trans.applySignature(new signature_1.Signature(tx.signature));
                item.transaction.hash = out_1.TransactionHash.compute(trans).toString();
            }
        }
        batch.status = transaction_batch_status_1.TransactionBatchStatus.pending;
        batch.sourceIp = sourceIp;
        for (const group of batch.groups) {
            for (const item of group.items) {
                item.status = batch_transaction_status_1.BatchTransactionStatus.pending;
            }
        }
        const group = batch.groups[0];
        this.logger.log(`Starting initial transactions for batch '${batch.id}'`);
        await this.startTransactionGroup(batch, group);
        if (group.items.filter(x => x.status === batch_transaction_status_1.BatchTransactionStatus.invalid).length > 0) {
            batch.status = transaction_batch_status_1.TransactionBatchStatus.invalid;
            return batch;
        }
        await this.cachingService.setRemote(cache_info_1.CacheInfo.TransactionBatch(transaction_batch_1.TransactionBatch.getAddress(batch), batch.id).key, batch, cache_info_1.CacheInfo.TransactionBatch(transaction_batch_1.TransactionBatch.getAddress(batch), batch.id).ttl);
        return batch;
    }
    async getTransactionBatches(address) {
        const keys = await this.cachingService.getKeys(cache_info_1.CacheInfo.TransactionBatch(address, '*').key);
        const transactionBatches = await this.cachingService.batchGetManyRemote(keys);
        return transactionBatches;
    }
    async getTransactionBatch(address, batchId) {
        return await this.cachingService.getRemote(cache_info_1.CacheInfo.TransactionBatch(address, batchId).key);
    }
    async startTransactionGroup(batch, group) {
        const results = [];
        for (const item of group.items) {
            const result = await this.executeTransaction(batch.id, item, batch.sourceIp);
            results.push(result);
            if (result.status === batch_transaction_status_1.BatchTransactionStatus.invalid) {
                break;
            }
        }
        const txHashes = results.filter(result => result.status === batch_transaction_status_1.BatchTransactionStatus.pending).map(result => result.transaction.hash);
        this.logger.log(`For batch with id '${batch.id}', starting transactions with hashes ${txHashes}`);
        const value = batch.id + ';' + transaction_batch_1.TransactionBatch.getAddress(batch) + ';' + new Date().toISOString();
        return await Promise.all(txHashes.map(hash => this.cachingService.setRemote(cache_info_1.CacheInfo.PendingTransaction(hash).key, value, cache_info_1.CacheInfo.PendingTransaction(hash).ttl)));
    }
    async executeTransaction(batchId, transactionBatchItem, sourceIp) {
        const transaction = transactionBatchItem.transaction;
        this.logger.log(`For batch with id '${batchId}', sending transaction with payload '${JSON.stringify(transaction.tx)}' from source ip '${sourceIp}'`);
        let result;
        try {
            result = await this.transactionService.createTransaction(new transaction_create_1.TransactionCreate(Object.assign({}, transaction.tx)));
        }
        catch (error) {
            this.logger.error(error);
            transactionBatchItem.status = batch_transaction_status_1.BatchTransactionStatus.invalid;
            try {
                transactionBatchItem.error = error.response.data.message;
            }
            catch (error) {
                this.logger.error(error);
            }
            this.logger.error(`For batch with id '${batchId}', error when executing transaction with payload '${JSON.stringify(transaction.tx)}'. Error message: ${transactionBatchItem.error}`);
            return transactionBatchItem;
        }
        if (result.txHash) {
            transaction.hash = result.txHash;
        }
        else {
            transactionBatchItem.status = batch_transaction_status_1.BatchTransactionStatus.invalid;
        }
        return transactionBatchItem;
    }
    convertToTransactionBatch(batch) {
        const transactionBatch = new transaction_batch_1.TransactionBatch();
        transactionBatch.id = batch.id;
        for (const batchGroup of batch.transactions) {
            const transactionGroup = new transaction_batch_group_1.TransactionBatchGroup();
            for (const groupTransaction of batchGroup) {
                const transactionItem = new transaction_batch_item_1.TransactionBatchItem();
                const transaction = new transaction_1.Transaction();
                transaction.tx = groupTransaction;
                transactionItem.transaction = transaction;
                transactionGroup.items.push(transactionItem);
            }
            transactionBatch.groups.push(transactionGroup);
        }
        return transactionBatch;
    }
    convertFromTransactionBatch(batch) {
        const transactionBatch = new transaction_batch_simplified_result_1.TransactionBatchSimplifiedResult();
        transactionBatch.id = batch.id;
        transactionBatch.status = batch.status;
        transactionBatch.transactions = [];
        for (const transactionBatchGroup of batch.groups) {
            const transactionBatchItems = [];
            for (const transactionItem of transactionBatchGroup.items) {
                const transaction = transactionItem.transaction.tx;
                const transactionBatchItem = Object.assign({}, transaction);
                if (batch.status === transaction_batch_status_1.TransactionBatchStatus.invalid && transactionItem.status === batch_transaction_status_1.BatchTransactionStatus.pending) {
                    transactionBatchItem.status = batch_transaction_status_1.BatchTransactionStatus.invalid;
                }
                else {
                    transactionBatchItem.status = transactionItem.status;
                }
                transactionBatchItem.error = transactionItem.error;
                transactionBatchItem.hash = transactionItem.transaction.hash;
                transactionBatchItems.push(transactionBatchItem);
            }
            transactionBatch.transactions.push(transactionBatchItems);
        }
        return transactionBatch;
    }
};
TransactionsBatchService = TransactionsBatchService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        transaction_service_1.TransactionService])
], TransactionsBatchService);
exports.TransactionsBatchService = TransactionsBatchService;
//# sourceMappingURL=transactions.batch.service.js.map
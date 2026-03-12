"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftCreateTransactionExtractor = void 0;
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
class NftCreateTransactionExtractor {
    constructor() {
        this.logger = new sdk_nestjs_common_1.OriginLogger(NftCreateTransactionExtractor.name);
    }
    canDetectNftCreateTransactionFromLogs(transaction) {
        if (!transaction.sender || !transaction.receiver) {
            return false;
        }
        if (!sdk_nestjs_common_1.AddressUtils.isSmartContractAddress(transaction.receiver)) {
            return false;
        }
        if (transaction.getDataFunctionName() !== 'buy') {
            return false;
        }
        return true;
    }
    extract(transaction, transactionDetailed) {
        var _a;
        if (transactionDetailed) {
            const events = (_a = transactionDetailed.logs) === null || _a === void 0 ? void 0 : _a.events;
            if (!events) {
                return undefined;
            }
            for (const event of events) {
                if (!event.identifier || event.identifier !== 'DCDTNFTCreate') {
                    continue;
                }
                const collectionBase64 = event.topics[0];
                if (!collectionBase64) {
                    continue;
                }
                const collection = sdk_nestjs_common_1.BinaryUtils.base64Decode(collectionBase64);
                this.logger.log(`Detected NFT create from logs for collection '${collection}' and tx hash '${transaction.hash}'`);
                return { collection };
            }
        }
        if (transaction.sender !== transaction.receiver) {
            return undefined;
        }
        if (transaction.getDataFunctionName() !== 'DCDTNFTCreate') {
            return undefined;
        }
        const args = transaction.getDataArgs();
        if (!args || args.length < 6) {
            return undefined;
        }
        const collectionHex = args[0];
        let collection = '';
        try {
            collection = sdk_nestjs_common_1.BinaryUtils.hexToString(collectionHex);
        }
        catch (error) {
            const logger = new common_1.Logger(NftCreateTransactionExtractor.name);
            logger.error(`Error in tryExtractNftMetadataFromNftCreateTransaction function. Could not convert collection hex '${collectionHex}' to string`);
            logger.error(error);
            return undefined;
        }
        this.logger.log(`Detected NFT create for collection '${collection}' and tx hash '${transaction.hash}'`);
        return { collection };
    }
}
exports.NftCreateTransactionExtractor = NftCreateTransactionExtractor;
//# sourceMappingURL=nft.create.transaction.extractor.js.map
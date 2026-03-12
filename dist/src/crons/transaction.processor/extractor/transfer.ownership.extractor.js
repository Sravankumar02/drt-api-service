"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferOwnershipExtractor = void 0;
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
class TransferOwnershipExtractor {
    extract(transaction) {
        if (transaction.getDataFunctionName() !== 'transferOwnership') {
            return undefined;
        }
        const args = transaction.getDataArgs();
        if (!args || args.length < 2) {
            return undefined;
        }
        const collectionHex = args[0];
        const addressHex = args[1];
        let collection = '';
        let address = '';
        try {
            collection = sdk_nestjs_common_1.BinaryUtils.hexToString(collectionHex);
        }
        catch (error) {
            const logger = new common_1.Logger(TransferOwnershipExtractor.name);
            logger.error(`Error in tryExtractTransferOwnership function. Could not convert collection hex '${collectionHex}' to string`);
            logger.error(error);
            return undefined;
        }
        try {
            address = sdk_nestjs_common_1.BinaryUtils.hexToString(addressHex);
        }
        catch (error) {
            const logger = new common_1.Logger(TransferOwnershipExtractor.name);
            logger.error(`Error in tryExtractTransferOwnership function. Could not convert address hex '${addressHex}' to string`);
            logger.error(error);
            return undefined;
        }
        const identifier = `${collection}`;
        return { identifier };
    }
}
exports.TransferOwnershipExtractor = TransferOwnershipExtractor;
//# sourceMappingURL=transfer.ownership.extractor.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SftChangeTransactionExtractor = void 0;
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
class SftChangeTransactionExtractor {
    extract(transaction) {
        if (transaction.getDataFunctionName() !== 'changeSFTToMetaDCDT') {
            return undefined;
        }
        const args = transaction.getDataArgs();
        if (!args || args.length === 0) {
            return undefined;
        }
        const collectionIdentifierHex = args[0];
        try {
            return sdk_nestjs_common_1.BinaryUtils.hexToString(collectionIdentifierHex);
        }
        catch (error) {
            const logger = new common_1.Logger(SftChangeTransactionExtractor.name);
            logger.error(`Error in tryExtractCollectionIdentifierFromChangeSftToMetaDcdTransaction function. Could not convert hex '${collectionIdentifierHex}' to string`);
            logger.error(error);
            return undefined;
        }
    }
}
exports.SftChangeTransactionExtractor = SftChangeTransactionExtractor;
//# sourceMappingURL=sft.change.transaction.extractor.js.map
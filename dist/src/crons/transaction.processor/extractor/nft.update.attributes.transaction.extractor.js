"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftUpdateAttributesTransactionExtractor = void 0;
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
class NftUpdateAttributesTransactionExtractor {
    extract(transaction) {
        if (transaction.getDataFunctionName() !== 'DCDTNFTUpdateAttributes') {
            return undefined;
        }
        const args = transaction.getDataArgs();
        if (!args || args.length < 3) {
            return undefined;
        }
        const collectionHex = args[0];
        const nonceHex = args[1];
        let collection = '';
        const nonce = nonceHex;
        try {
            collection = sdk_nestjs_common_1.BinaryUtils.hexToString(collectionHex);
        }
        catch (error) {
            const logger = new common_1.Logger(NftUpdateAttributesTransactionExtractor.name);
            logger.error(`Error in tryExtractNftMetadataFromUpdateAttributes function. Could not convert collection hex '${collectionHex}' to string`);
            logger.error(error);
            return undefined;
        }
        const identifier = `${collection}-${nonce}`;
        return { identifier };
    }
}
exports.NftUpdateAttributesTransactionExtractor = NftUpdateAttributesTransactionExtractor;
//# sourceMappingURL=nft.update.attributes.transaction.extractor.js.map
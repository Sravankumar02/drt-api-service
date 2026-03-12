"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftMessage = void 0;
const process_nft_settings_1 = require("../../../../endpoints/process-nfts/entities/process.nft.settings");
class NftMessage {
    constructor() {
        this.identifier = '';
        this.settings = new process_nft_settings_1.ProcessNftSettings();
    }
}
exports.NftMessage = NftMessage;
//# sourceMappingURL=nft.message.js.map
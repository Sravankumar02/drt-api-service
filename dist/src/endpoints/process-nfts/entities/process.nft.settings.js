"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessNftSettings = void 0;
class ProcessNftSettings {
    constructor(init) {
        this.forceRefreshMedia = false;
        this.forceRefreshMetadata = false;
        this.forceRefreshThumbnail = false;
        this.skipRefreshThumbnail = false;
        this.uploadAsset = false;
        Object.assign(this, init);
    }
    static fromRequest(processNftRequest) {
        var _a, _b, _c, _d, _e;
        return new ProcessNftSettings({
            forceRefreshMedia: (_a = processNftRequest.forceRefreshMedia) !== null && _a !== void 0 ? _a : false,
            forceRefreshMetadata: (_b = processNftRequest.forceRefreshMetadata) !== null && _b !== void 0 ? _b : false,
            forceRefreshThumbnail: (_c = processNftRequest.forceRefreshThumbnail) !== null && _c !== void 0 ? _c : false,
            skipRefreshThumbnail: (_d = processNftRequest.skipRefreshThumbnail) !== null && _d !== void 0 ? _d : false,
            uploadAsset: (_e = processNftRequest.uploadAsset) !== null && _e !== void 0 ? _e : false,
        });
    }
}
exports.ProcessNftSettings = ProcessNftSettings;
//# sourceMappingURL=process.nft.settings.js.map
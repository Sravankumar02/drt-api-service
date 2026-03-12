"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThumbnailType = void 0;
class ThumbnailType {
    static isImage(fileType) {
        return fileType.startsWith("image");
    }
    static isVideo(fileType) {
        return fileType.startsWith("video");
    }
    static isAudio(fileType) {
        return fileType.startsWith("audio");
    }
}
exports.ThumbnailType = ThumbnailType;
//# sourceMappingURL=thumbnail.type.js.map
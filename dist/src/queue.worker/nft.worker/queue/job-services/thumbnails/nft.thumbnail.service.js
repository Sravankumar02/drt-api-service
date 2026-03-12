"use strict";
var NftThumbnailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftThumbnailService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const sharp_1 = tslib_1.__importStar(require("sharp"));
const fluent_ffmpeg_1 = tslib_1.__importDefault(require("fluent-ffmpeg"));
const path_1 = tslib_1.__importDefault(require("path"));
const api_config_service_1 = require("../../../../../common/api-config/api.config.service");
const generate_thumbnail_result_1 = require("./entities/generate.thumbnail.result");
const thumbnail_type_1 = require("./entities/thumbnail.type");
const aws_service_1 = require("./aws.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const token_helpers_1 = require("../../../../../utils/token.helpers");
const sdk_nestjs_common_2 = require("@sravankumar02/sdk-nestjs-common");
const cache_info_1 = require("../../../../../utils/cache.info");
const caching_utils_1 = require("../../../../../utils/caching.utils");
let NftThumbnailService = NftThumbnailService_1 = class NftThumbnailService {
    constructor(apiConfigService, awsService, apiService, cachingService) {
        this.apiConfigService = apiConfigService;
        this.awsService = awsService;
        this.apiService = apiService;
        this.cachingService = cachingService;
        this.logger = new sdk_nestjs_common_2.OriginLogger(NftThumbnailService_1.name);
        this.STANDARD_PATH = 'nfts/thumbnail';
        this.API_TIMEOUT_MILLISECONDS = sdk_nestjs_common_1.Constants.oneSecond() * 30 * 1000;
    }
    async extractThumbnailFromImage(buffer) {
        try {
            return await (0, sharp_1.default)(buffer)
                .resize({
                width: this.apiConfigService.getImageWidth(),
                height: this.apiConfigService.getImageHeight(),
                fit: sharp_1.fit.cover,
            })
                .withMetadata()
                .jpeg({ progressive: true })
                .toBuffer();
        }
        catch (error) {
            this.logger.error(error);
            return undefined;
        }
    }
    async getScreenshot(videoPath, seek, outputPath) {
        await new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)(videoPath)
                .seek(seek)
                .takeFrames(1)
                .saveToFile(outputPath)
                .on('start', (commandLine) => {
                this.logger.log('Spawned ffmpeg with command: ' + commandLine);
            })
                .on('error', (error, stdout, stderr) => {
                this.logger.error(`An unhandled exception occurred when taking a screenshot from video path '${videoPath}'`);
                this.logger.error(error);
                this.logger.error(stdout);
                this.logger.error(stderr);
                reject(error);
            })
                .on('end', () => {
                resolve(true);
            });
        });
    }
    async extractThumbnailFromVideo(file, nftIdentifier) {
        const screenshot = await this.extractScreenshotFromVideo(file, nftIdentifier);
        if (!screenshot) {
            return undefined;
        }
        return await this.extractThumbnailFromImage(screenshot);
    }
    async extractThumbnailFromAudio(buffer, nftIdentifier) {
        const audioPath = path_1.default.join(this.apiConfigService.getTempUrl(), nftIdentifier);
        await sdk_nestjs_common_1.FileUtils.writeFile(buffer, audioPath);
        const outputPath = path_1.default.join(this.apiConfigService.getTempUrl(), `${nftIdentifier}.screenshot.jpg`);
        try {
            await new Promise((resolve, reject) => {
                (0, fluent_ffmpeg_1.default)(audioPath)
                    .complexFilter([
                    { filter: 'showwavespic', options: { s: '600x600', colors: '#1f43f4' } },
                ])
                    .frames(1)
                    .saveToFile(outputPath)
                    .on('error', (error, stdout, stderr) => {
                    this.logger.error(`An unhandled exception occurred when extracting waveform from audio path '${audioPath}'`);
                    this.logger.error(error);
                    this.logger.error(stdout);
                    this.logger.error(stderr);
                    reject(error);
                })
                    .on('end', () => {
                    resolve(true);
                });
            });
            const result = await sdk_nestjs_common_1.FileUtils.readFile(outputPath);
            return result;
        }
        finally {
            const fileExists = await sdk_nestjs_common_1.FileUtils.exists(outputPath);
            if (fileExists) {
                await sdk_nestjs_common_1.FileUtils.deleteFile(outputPath);
            }
        }
    }
    async extractScreenshotFromVideo(buffer, nftIdentifier) {
        const frames = [0, 10, 30];
        const filePaths = frames.map(x => path_1.default.join(this.apiConfigService.getTempUrl(), `${nftIdentifier}.screenshot.${x}.jpg`));
        const videoPath = path_1.default.join(this.apiConfigService.getTempUrl(), nftIdentifier);
        await sdk_nestjs_common_1.FileUtils.writeFile(buffer, videoPath);
        try {
            let maxSizeIndex = -1;
            let maxSize = -1;
            for (const [index, filePath] of filePaths.entries()) {
                await this.getScreenshot(videoPath, frames[index], filePath);
                const fileExists = await sdk_nestjs_common_1.FileUtils.exists(filePath);
                if (fileExists) {
                    const fileSize = await sdk_nestjs_common_1.FileUtils.getFileSize(filePath);
                    if (fileSize > maxSize) {
                        maxSize = fileSize;
                        maxSizeIndex = index;
                    }
                }
            }
            if (maxSizeIndex < 0) {
                return undefined;
            }
            return await sdk_nestjs_common_1.FileUtils.readFile(filePaths[maxSizeIndex]);
        }
        catch (error) {
            this.logger.error({ error });
            return undefined;
        }
        finally {
            for (const filePath of filePaths) {
                const fileExists = await sdk_nestjs_common_1.FileUtils.exists(filePath);
                if (fileExists) {
                    await sdk_nestjs_common_1.FileUtils.deleteFile(filePath);
                }
            }
            const fileExists = await sdk_nestjs_common_1.FileUtils.exists(videoPath);
            if (fileExists) {
                await sdk_nestjs_common_1.FileUtils.deleteFile(videoPath);
            }
        }
    }
    async hasThumbnailGenerated(identifier, fileUrl) {
        const urlIdentifier = token_helpers_1.TokenHelpers.getThumbnailUrlIdentifier(identifier, fileUrl);
        const url = this.getFullThumbnailUrl(urlIdentifier);
        let hasThumbnail = true;
        await this.apiService.head(url, { skipRedirects: true }, async (error) => {
            var _a;
            const status = (_a = error.response) === null || _a === void 0 ? void 0 : _a.status;
            if ([common_1.HttpStatus.FOUND, common_1.HttpStatus.NOT_FOUND, common_1.HttpStatus.FORBIDDEN].includes(status)) {
                hasThumbnail = false;
                return true;
            }
            return false;
        });
        return hasThumbnail;
    }
    async generateThumbnail(nft, fileUrl, fileType, forceRefresh = false) {
        const nftIdentifier = nft.identifier;
        if (!fileUrl || !fileUrl.startsWith('https://')) {
            this.logger.log(`NFT with identifier '${nftIdentifier}' and url '${fileUrl}' doesn't exist or is invalid`);
            return generate_thumbnail_result_1.GenerateThumbnailResult.noUrl;
        }
        const urlHash = token_helpers_1.TokenHelpers.getUrlHash(fileUrl);
        const cacheIdentifier = `${nft.identifier}-${urlHash}`;
        const fileResult = await caching_utils_1.CachingUtils.executeOptimistic({
            cachingService: this.cachingService,
            description: `Generating thumbnail for NFT with identifier '${nftIdentifier}', url '${fileUrl}' and url hash '${urlHash}'`,
            key: cache_info_1.CacheInfo.PendingGenerateThumbnail(cacheIdentifier).key,
            ttl: cache_info_1.CacheInfo.PendingGenerateThumbnail(cacheIdentifier).ttl,
            action: async () => await this.apiService.get(fileUrl, { responseType: 'arraybuffer', timeout: this.API_TIMEOUT_MILLISECONDS }),
        });
        if (!fileResult) {
            return generate_thumbnail_result_1.GenerateThumbnailResult.pendingUploadAsset;
        }
        const file = fileResult.data;
        const urlIdentifier = token_helpers_1.TokenHelpers.getThumbnailUrlIdentifier(nftIdentifier, fileUrl);
        if (!forceRefresh) {
            const hasThumbnailGenerated = await this.hasThumbnailGenerated(nftIdentifier, fileUrl);
            if (hasThumbnailGenerated) {
                this.logger.log(`Thumbnail already generated for NFT with identifier '${nftIdentifier}' and url hash '${urlHash}'`);
                return generate_thumbnail_result_1.GenerateThumbnailResult.success;
            }
        }
        if (thumbnail_type_1.ThumbnailType.isAudio(fileType)) {
            const thumbnail = await this.extractThumbnailFromAudio(file, nftIdentifier);
            if (thumbnail) {
                await this.uploadThumbnail(urlIdentifier, thumbnail, 'image/jpeg');
                this.logger.log(`Successfully generated audio thumbnail for NFT with identifier '${nftIdentifier}' and url hash '${urlHash}'`);
                return generate_thumbnail_result_1.GenerateThumbnailResult.success;
            }
            else {
                this.logger.error(`Thumbnail could not be generated from audio for NFT with identifier '${nftIdentifier}' and url hash '${urlHash}'`);
                return generate_thumbnail_result_1.GenerateThumbnailResult.couldNotExtractThumbnail;
            }
        }
        else if (thumbnail_type_1.ThumbnailType.isImage(fileType)) {
            const thumbnail = await this.extractThumbnailFromImage(file);
            if (thumbnail) {
                await this.uploadThumbnail(urlIdentifier, thumbnail, 'image/jpeg');
                this.logger.log(`Successfully generated image thumbnail for NFT with identifier '${nftIdentifier}' and url hash '${urlHash}'`);
                return generate_thumbnail_result_1.GenerateThumbnailResult.success;
            }
            else {
                this.logger.error(`Thumbnail could not be generated from image for NFT with identifier '${nftIdentifier}' and url hash '${urlHash}'`);
                return generate_thumbnail_result_1.GenerateThumbnailResult.couldNotExtractThumbnail;
            }
        }
        else if (thumbnail_type_1.ThumbnailType.isVideo(fileType)) {
            const thumbnail = await this.extractThumbnailFromVideo(file, nftIdentifier);
            if (thumbnail) {
                await this.uploadThumbnail(urlIdentifier, thumbnail, 'image/jpeg');
                this.logger.log(`Successfully generated video thumbnail for NFT with identifier '${nftIdentifier}' and url hash '${urlHash}'`);
                return generate_thumbnail_result_1.GenerateThumbnailResult.success;
            }
            else {
                this.logger.error(`Thumbnail could not be generated from video for NFT with identifier '${nftIdentifier}' and url hash '${urlHash}'`);
                return generate_thumbnail_result_1.GenerateThumbnailResult.couldNotExtractThumbnail;
            }
        }
        else {
            this.logger.log(`Could not determine file type for NFT with identifier '${nftIdentifier}' and file type '${fileType}' and url hash '${urlHash}'`);
            return generate_thumbnail_result_1.GenerateThumbnailResult.unrecognizedFileType;
        }
    }
    async uploadThumbnail(urlIdentifier, buffer, fileType) {
        const url = this.getThumbnailUrlSuffix(urlIdentifier);
        await this.awsService.uploadToS3(url, buffer, fileType);
    }
    getFullThumbnailUrl(urlIdentifier) {
        var _a;
        const suffix = this.getThumbnailUrlSuffix(urlIdentifier);
        const mediaUrl = (_a = this.apiConfigService.getMediaInternalUrl()) !== null && _a !== void 0 ? _a : this.apiConfigService.getMediaUrl();
        return `${mediaUrl}/${suffix}`;
    }
    getThumbnailUrlSuffix(urlIdentifier) {
        return `${this.STANDARD_PATH}/${urlIdentifier}`;
    }
};
NftThumbnailService = NftThumbnailService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        aws_service_1.AWSService,
        sdk_nestjs_http_1.ApiService,
        sdk_nestjs_cache_1.CacheService])
], NftThumbnailService);
exports.NftThumbnailService = NftThumbnailService;
//# sourceMappingURL=nft.thumbnail.service.js.map
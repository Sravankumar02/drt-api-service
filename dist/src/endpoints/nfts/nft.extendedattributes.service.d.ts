import { ApiService } from "@sravankumar02/sdk-nestjs-http";
import { NftMetadata } from "src/endpoints/nfts/entities/nft.metadata";
import { ApiConfigService } from "../../common/api-config/api.config.service";
export declare class NftExtendedAttributesService {
    private readonly apiConfigService;
    private readonly apiService;
    private readonly logger;
    constructor(apiConfigService: ApiConfigService, apiService: ApiService);
    tryGetExtendedAttributesFromBase64EncodedAttributes(attributes: string): Promise<any>;
    getExtendedAttributesFromBase64EncodedAttributes(attributes: string): Promise<NftMetadata | undefined>;
    getExtendedAttributesFromMetadata(metadata: string): Promise<any>;
    private getExtendedAttributesFromIpfs;
    private createError;
    getTags(attributes: string): string[];
    getMetadataFromBase64EncodedAttributes(attributes: string): string | undefined;
}

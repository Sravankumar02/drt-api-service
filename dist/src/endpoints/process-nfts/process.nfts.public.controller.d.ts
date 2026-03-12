import { ProcessNftRequest } from "./entities/process.nft.request";
import { ProcessNftsService } from "./process.nfts.service";
export declare class ProcessNftsPublicController {
    private readonly processNftService;
    constructor(processNftService: ProcessNftsService);
    generateThumbnails(address: string, processNftRequest: ProcessNftRequest): Promise<{
        [key: string]: boolean;
    }>;
}

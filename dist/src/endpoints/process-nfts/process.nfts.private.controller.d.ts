import { ProcessNftRequest } from "./entities/process.nft.request";
import { ProcessNftsService } from "./process.nfts.service";
export declare class ProcessNftsPrivateController {
    private readonly processNftService;
    constructor(processNftService: ProcessNftsService);
    generateThumbnails(processNftRequest: ProcessNftRequest): Promise<{
        [key: string]: boolean;
    }>;
}

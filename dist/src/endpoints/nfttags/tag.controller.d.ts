import { Tag } from './entities/tag';
import { TagService } from './tag.service';
export declare class TagController {
    private readonly nftTagsService;
    constructor(nftTagsService: TagService);
    getTags(from: number, size: number, search: string | undefined): Promise<Tag[]>;
    getTagCount(search: string | undefined): Promise<number>;
    getTagDetails(tag: string): Promise<Tag>;
}

import { NftRarity } from "./nft.rarity";
export declare class NftRarities {
    constructor(init?: Partial<NftRarities>);
    statistical: NftRarity | undefined;
    trait: NftRarity | undefined;
    jaccardDistances: NftRarity | undefined;
    openRarity: NftRarity | undefined;
    custom: NftRarity | undefined;
}

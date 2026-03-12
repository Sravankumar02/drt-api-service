import { CollectionTrait } from "src/endpoints/collections/entities/collection.trait";
import { NftMedia } from "src/endpoints/nfts/entities/nft.media";
import { Repository } from "typeorm";
import { NftMediaDb } from "./entities/nft.media.db";
import { NftMetadataDb } from "./entities/nft.metadata.db";
import { NftTraitSummaryDb } from "./entities/nft.trait.summary.db";
import { PersistenceInterface } from "./persistence.interface";
import { KeybaseConfirmationDb } from "./entities/keybase.confirmation.db";
import { HotSwappableSettingDb } from "./entities/hot.swappable.setting";
export declare class PersistenceService implements PersistenceInterface {
    private readonly nftMetadataRepository;
    private readonly nftMediaRepository;
    private readonly nftTraitSummaryRepository;
    private readonly keybaseConfirmationRepository;
    private readonly settingsRepository;
    constructor(nftMetadataRepository: Repository<NftMetadataDb>, nftMediaRepository: Repository<NftMediaDb>, nftTraitSummaryRepository: Repository<NftTraitSummaryDb>, keybaseConfirmationRepository: Repository<KeybaseConfirmationDb>, settingsRepository: Repository<HotSwappableSettingDb>);
    getMetadata(identifier: string): Promise<any | null>;
    batchGetMetadata(identifiers: string[]): Promise<Record<string, any>>;
    setMetadata(identifier: string, content: any): Promise<void>;
    private save;
    deleteMetadata(identifier: string): Promise<any>;
    getMedia(identifier: string): Promise<NftMedia[] | null>;
    batchGetMedia(identifiers: string[]): Promise<Record<string, NftMedia[]>>;
    setMedia(identifier: string, media: NftMedia[]): Promise<void>;
    getCollectionTraits(collection: string): Promise<CollectionTrait[] | null>;
    getKeybaseConfirmationForIdentity(identity: string): Promise<string[] | undefined>;
    setKeybaseConfirmationForIdentity(identity: string, keys: string[]): Promise<void>;
    getSetting<T>(name: string): Promise<T | undefined>;
    setSetting<T>(name: string, value: T): Promise<void>;
    getAllSettings(): Promise<{
        name: string;
        value: any;
    }[]>;
}

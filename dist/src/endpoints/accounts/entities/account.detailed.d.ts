import { ScamInfo } from "src/common/entities/scam-info.dto";
import { NftCollectionAccount } from "src/endpoints/collections/entities/nft.collection.account";
import { NftAccount } from "src/endpoints/nfts/entities/nft.account";
import { Account } from "./account";
export declare class AccountDetailed extends Account {
    constructor(init?: Partial<AccountDetailed>);
    code: string;
    codeHash: string;
    rootHash: string;
    username: string | undefined;
    developerReward: string;
    ownerAddress: string;
    isUpgradeable?: boolean;
    isReadable?: boolean;
    isPayable?: boolean;
    isPayableBySmartContract?: boolean | undefined;
    scamInfo: ScamInfo | undefined;
    nftCollections: NftCollectionAccount[] | undefined;
    nfts: NftAccount[] | undefined;
    activeGuardianActivationEpoch?: number;
    activeGuardianAddress?: string;
    activeGuardianServiceUid?: string;
    pendingGuardianActivationEpoch?: number;
    pendingGuardianAddress?: string;
    pendingGuardianServiceUid?: string;
    isGuarded?: boolean;
}

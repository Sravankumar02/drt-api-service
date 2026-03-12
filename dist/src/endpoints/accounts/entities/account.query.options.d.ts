import { SortOrder } from "src/common/entities/sort.order";
import { AccountSort } from "./account.sort";
export declare class AccountQueryOptions {
    constructor(init?: Partial<AccountQueryOptions>);
    addresses?: string[];
    ownerAddress?: string;
    sort?: AccountSort;
    order?: SortOrder;
    isSmartContract?: boolean;
    withOwnerAssets?: boolean;
    withDeployInfo?: boolean;
    withTxCount?: boolean;
    withScrCount?: boolean;
    name?: string;
    tags?: string[];
    excludeTags?: string[];
    hasAssets?: boolean;
    search?: string;
    withBalance?: boolean;
    validate(size: number): void;
    isSet(): boolean;
}

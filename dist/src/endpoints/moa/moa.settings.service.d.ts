import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { GraphQlService } from "src/common/graphql/graphql.service";
import { TransactionMetadata } from "../transactions/transaction-action/entities/transaction.metadata";
import { TransactionMetadataTransfer } from "../transactions/transaction-action/entities/transaction.metadata.transfer";
import { MoaSettings } from "./entities/moa.settings";
import { ApiConfigService } from "src/common/api-config/api.config.service";
export declare class MoaSettingsService {
    private readonly cachingService;
    private readonly graphQlService;
    private readonly apiConfigService;
    private wrewaId;
    constructor(cachingService: CacheService, graphQlService: GraphQlService, apiConfigService: ApiConfigService);
    getTransfers(metadata: TransactionMetadata): TransactionMetadataTransfer[] | undefined;
    isMoaInteraction(metadata: TransactionMetadata): Promise<boolean>;
    refreshSettings(): Promise<void>;
    getSettings(): Promise<MoaSettings | null>;
    getMoaContracts(): Promise<Set<string>>;
    getMoaContractsRaw(): Promise<Set<string>>;
    getSettingsRaw(): Promise<MoaSettings | null>;
    getWrewaId(): string | undefined;
    private getPairLimitCount;
}

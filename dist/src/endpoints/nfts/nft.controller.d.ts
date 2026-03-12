import { NftMediaService } from "src/queue.worker/nft.worker/queue/job-services/media/nft.media.service";
import { Nft } from "./entities/nft";
import { NftOwner } from "./entities/nft.owner";
import { NftType } from "./entities/nft.type";
import { NftService } from "./nft.service";
import { TransactionStatus } from '../transactions/entities/transaction.status';
import { SortOrder } from 'src/common/entities/sort.order';
import { TransactionService } from '../transactions/transaction.service';
import { Transaction } from '../transactions/entities/transaction';
import { ScamType } from 'src/common/entities/scam-type.enum';
import { TransferService } from '../transfers/transfer.service';
import { NftSubType } from './entities/nft.sub.type';
export declare class NftController {
    private readonly nftService;
    private readonly nftMediaService;
    private readonly transactionService;
    private readonly transferService;
    constructor(nftService: NftService, nftMediaService: NftMediaService, transactionService: TransactionService, transferService: TransferService);
    getNfts(from: number, size: number, search?: string, identifiers?: string[], type?: NftType[], subType?: NftSubType[], collection?: string, collections?: string[], name?: string, tags?: string[], creator?: string, isWhitelistedStorage?: boolean, hasUris?: boolean, isNsfw?: boolean, isScam?: boolean, scamType?: ScamType, traits?: Record<string, string>, before?: number, after?: number, withOwner?: boolean, withSupply?: boolean): Promise<Nft[]>;
    getNftCount(search?: string, identifiers?: string[], type?: NftType[], subType?: NftSubType[], collection?: string, collections?: string[], name?: string, tags?: string[], creator?: string, isWhitelistedStorage?: boolean, hasUris?: boolean, isNsfw?: boolean, traits?: Record<string, string>, before?: number, after?: number, isScam?: boolean, scamType?: ScamType): Promise<number>;
    getNftCountAlternative(search?: string, identifiers?: string[], type?: NftType[], subType?: NftSubType[], collection?: string, collections?: string[], name?: string, tags?: string[], creator?: string, isWhitelistedStorage?: boolean, hasUris?: boolean, isNsfw?: boolean, traits?: Record<string, string>, before?: number, after?: number, isScam?: boolean, scamType?: ScamType): Promise<number>;
    getNft(identifier: string): Promise<Nft>;
    resolveNftThumbnail(identifier: string, response: Response): Promise<void>;
    getNftSupply(identifier: string): Promise<{
        supply: string;
    }>;
    getNftAccounts(identifier: string, from: number, size: number): Promise<NftOwner[]>;
    getNftAccountsCount(identifier: string): Promise<number>;
    getNftTransactions(identifier: string, from: number, size: number, sender?: string, receiver?: string[], senderShard?: number, receiverShard?: number, miniBlockHash?: string, hashes?: string[], status?: TransactionStatus, functions?: string[], before?: number, after?: number, order?: SortOrder, withScResults?: boolean, withOperations?: boolean, withLogs?: boolean, withScamInfo?: boolean, withUsername?: boolean, withRelayedScresults?: boolean): Promise<Transaction[]>;
    getNftTransactionsCount(identifier: string, sender?: string, receiver?: string[], senderShard?: number, receiverShard?: number, miniBlockHash?: string, hashes?: string[], status?: TransactionStatus, before?: number, after?: number, withRelayedScresults?: boolean): Promise<number>;
    getNftTransfers(identifier: string, from: number, size: number, sender?: string, receiver?: string[], senderShard?: number, receiverShard?: number, miniBlockHash?: string, hashes?: string[], status?: TransactionStatus, functions?: string[], before?: number, after?: number, order?: SortOrder, withScResults?: boolean, withOperations?: boolean, withLogs?: boolean, withScamInfo?: boolean, withUsername?: boolean): Promise<Transaction[]>;
    getNftTransfersCount(identifier: string, sender?: string, receiver?: string[], senderShard?: number, receiverShard?: number, miniBlockHash?: string, hashes?: string[], status?: TransactionStatus, before?: number, after?: number): Promise<number>;
}

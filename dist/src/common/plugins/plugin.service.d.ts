import { NestExpressApplication } from "@nestjs/platform-express";
import { AccountDetailed } from "src/endpoints/accounts/entities/account.detailed";
import { About } from "src/endpoints/network/entities/about";
import { Nft } from "src/endpoints/nfts/entities/nft";
import { Transaction } from "src/endpoints/transactions/entities/transaction";
import { DcdtSupply } from "../gateway/entities/dcdt.supply";
export declare class PluginService {
    processTransactions(_transactions: Transaction[], _withScamInfo?: boolean): Promise<void>;
    processTransactionSend(_transaction: any): Promise<any>;
    processAccount(_account: AccountDetailed): Promise<void>;
    bootstrapPublicApp(_application: NestExpressApplication): Promise<void>;
    batchProcessNfts(_nfts: Nft[], _withScamInfo?: boolean): Promise<void>;
    processAbout(_about: About): Promise<void>;
    formatTokenSupply(_identifier: string, _dcdtSupply: DcdtSupply): void;
}

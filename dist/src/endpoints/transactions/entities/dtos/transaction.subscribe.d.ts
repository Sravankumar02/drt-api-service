import { TransactionStatus } from '../transaction.status';
import { SortOrder } from 'src/common/entities/sort.order';
export declare class TransactionSubscribePayload {
    status?: TransactionStatus;
    order?: SortOrder;
    isRelayed?: boolean;
    isScCall?: boolean;
    withScResults?: boolean;
    withRelayedScresults?: boolean;
    withOperations?: boolean;
    withLogs?: boolean;
    withScamInfo?: boolean;
    withUsername?: boolean;
    withBlockInfo?: boolean;
    withActionTransferValue?: boolean;
    from?: number;
    size?: number;
    fields?: string[];
}

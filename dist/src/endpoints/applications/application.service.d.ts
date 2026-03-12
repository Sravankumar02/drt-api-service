import { ElasticIndexerService } from 'src/common/indexer/elastic/elastic.indexer.service';
import { Application } from './entities/application';
import { QueryPagination } from 'src/common/entities/query.pagination';
import { ApplicationFilter } from './entities/application.filter';
import { AssetsService } from '../../common/assets/assets.service';
import { GatewayService } from 'src/common/gateway/gateway.service';
import { TransferService } from '../transfers/transfer.service';
import { CacheService } from '@sravankumar02/sdk-nestjs-cache';
export declare class ApplicationService {
    private readonly elasticIndexerService;
    private readonly assetsService;
    private readonly gatewayService;
    private readonly transferService;
    private readonly cacheService;
    private readonly logger;
    constructor(elasticIndexerService: ElasticIndexerService, assetsService: AssetsService, gatewayService: GatewayService, transferService: TransferService, cacheService: CacheService);
    getApplications(pagination: QueryPagination, filter: ApplicationFilter): Promise<Application[]>;
    getApplicationsRaw(pagination: QueryPagination, filter: ApplicationFilter): Promise<Application[]>;
    getApplicationsCount(filter: ApplicationFilter): Promise<number>;
    getApplication(address: string): Promise<Application>;
    private getApplicationTxCount;
    private getApplicationBalance;
}

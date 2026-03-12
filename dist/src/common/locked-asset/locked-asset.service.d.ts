import { ApiConfigService } from '../api-config/api.config.service';
import { VmQueryService } from '../../endpoints/vm.query/vm.query.service';
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { GatewayService } from '../gateway/gateway.service';
import { MoaSettingsService } from 'src/endpoints/moa/moa.settings.service';
import { UnlockMileStoneModel } from './entities/unlock.milestone.model';
export declare class LockedAssetService {
    private readonly apiConfigService;
    private readonly vmQueryService;
    private readonly cachingService;
    private readonly gatewayService;
    private readonly moaSettingsService;
    constructor(apiConfigService: ApiConfigService, vmQueryService: VmQueryService, cachingService: CacheService, gatewayService: GatewayService, moaSettingsService: MoaSettingsService);
    getLkmoaUnlockSchedule(identifier: string, attributes: string): Promise<UnlockMileStoneModel[] | undefined>;
    getXmoaUnlockEpoch(identifier: string, attributes: string): Promise<number | undefined>;
    private getExtendedAttributesActivationNonce;
    private getExtendedAttributesActivationNonceRaw;
    private getInitEpoch;
    private getInitEpochRaw;
    private getLockedTokens;
    private getLockedTokensRaw;
    private getUnlockMilestones;
    private getRemainingEpochs;
    private getMonthStartEpoch;
    private getCurrentEpochCached;
    private getCurrentEpoch;
}

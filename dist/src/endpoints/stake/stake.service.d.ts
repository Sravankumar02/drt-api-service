import { ApiConfigService } from "src/common/api-config/api.config.service";
import { VmQueryService } from "src/endpoints/vm.query/vm.query.service";
import { Node } from "../nodes/entities/node";
import { NodeService } from "../nodes/node.service";
import { Stake } from "./entities/stake";
import { StakeTopup } from "./entities/stake.topup";
import { NetworkService } from "../network/network.service";
import { GatewayService } from "src/common/gateway/gateway.service";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { IdentitiesService } from "../identities/identities.service";
import { GlobalStake } from "./entities/global.stake";
import { ValidatorInfoResult } from "./entities/validator.info.result";
import { BlockService } from "../blocks/block.service";
import { Auction } from "src/common/gateway/entities/auction";
export declare class StakeService {
    private readonly cachingService;
    private readonly vmQueryService;
    private readonly apiConfigService;
    private readonly nodeService;
    private readonly gatewayService;
    private readonly networkService;
    private readonly identitiesService;
    private readonly blockService;
    private logger;
    constructor(cachingService: CacheService, vmQueryService: VmQueryService, apiConfigService: ApiConfigService, nodeService: NodeService, gatewayService: GatewayService, networkService: NetworkService, identitiesService: IdentitiesService, blockService: BlockService);
    getGlobalStake(): Promise<GlobalStake | undefined>;
    getGlobalStakeRaw(): Promise<GlobalStake>;
    getValidators(): Promise<ValidatorInfoResult>;
    getTotalAndInactiveValidators(validators: Node[]): Promise<{
        totalValidators: number;
        inactiveValidators: number;
    }>;
    getTotalAndInactiveValidatorsBeforeStakingV4(validators: Node[]): {
        totalValidators: number;
        inactiveValidators: number;
    };
    getTotalAndInactiveValidatorsDuringStakingV4(validators: Node[]): Promise<{
        totalValidators: number;
        inactiveValidators: number;
    }>;
    getTotalAndInactiveValidatorsAfterStakingV4(nodes: Node[]): Promise<{
        totalValidators: number;
        inactiveValidators: number;
    }>;
    getStakes(addresses: string[]): Promise<Stake[]>;
    getAllStakesForNode(address: string): Promise<StakeTopup>;
    getAllStakesForNodes(addresses: string[]): Promise<StakeTopup[]>;
    getAllStakesForAddressNodesRaw(address: string): Promise<StakeTopup>;
    getStakeForAddress(address: string): Promise<any>;
    getMinimumAuctionTopUp(auctions: Auction[]): string | undefined;
    getMinimumAuctionStake(auctions: Auction[]): string;
    getNakamotoCoefficient(): Promise<number>;
}

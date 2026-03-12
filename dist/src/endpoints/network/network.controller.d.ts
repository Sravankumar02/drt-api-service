import { NetworkConstants } from './entities/constants';
import { Economics } from './entities/economics';
import { NetworkService } from './network.service';
import { Stats } from 'src/endpoints/network/entities/stats';
import { About } from './entities/about';
export declare class NetworkController {
    private readonly networkService;
    constructor(networkService: NetworkService);
    getConstants(): Promise<NetworkConstants>;
    getEconomics(): Promise<Economics>;
    getStats(): Promise<Stats>;
    getAbout(): Promise<About>;
}

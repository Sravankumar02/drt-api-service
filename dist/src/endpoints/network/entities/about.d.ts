import { FeatureConfigs } from "./feature.configs";
export declare class About {
    constructor(init?: Partial<About>);
    appVersion: string | undefined;
    pluginsVersion: string | undefined;
    network: string;
    cluster: string;
    version: string;
    indexerVersion: string | undefined;
    gatewayVersion: string | undefined;
    scamEngineVersion: string | undefined;
    features: FeatureConfigs | undefined;
}

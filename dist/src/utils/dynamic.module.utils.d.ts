import { DynamicModule, Provider } from "@nestjs/common";
export declare class DynamicModuleUtils {
    static getElasticModule(): DynamicModule;
    static getCacheModule(): DynamicModule;
    static getRedisCacheModule(): DynamicModule;
    static getApiModule(): DynamicModule;
    static getNestJsApiConfigService(): Provider;
    static getPubSubService(): Provider;
}

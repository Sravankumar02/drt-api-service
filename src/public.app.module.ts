import { Module } from '@nestjs/common';
import '@sravankumar02/sdk-nestjs-common/lib/utils/extensions/array.extensions';
import '@sravankumar02/sdk-nestjs-common/lib/utils/extensions/date.extensions';
import '@sravankumar02/sdk-nestjs-common/lib/utils/extensions/number.extensions';
import '@sravankumar02/sdk-nestjs-common/lib/utils/extensions/string.extensions';
import { EndpointsServicesModule } from './endpoints/endpoints.services.module';
import { EndpointsControllersModule } from './endpoints/endpoints.controllers.module';
import { GuestCacheService } from '@sravankumar02/sdk-nestjs-cache';
import { LoggingModule } from '@sravankumar02/sdk-nestjs-common';
import { DynamicModuleUtils } from './utils/dynamic.module.utils';
import { LocalCacheController } from './endpoints/caching/local.cache.controller';

@Module({
  imports: [
    LoggingModule,
    EndpointsServicesModule,
    EndpointsControllersModule.forRoot(),
    DynamicModuleUtils.getRedisCacheModule(),
  ],
  controllers: [
    LocalCacheController,
  ],
  providers: [
    DynamicModuleUtils.getNestJsApiConfigService(),
    GuestCacheService,
  ],
  exports: [
    EndpointsServicesModule,
  ],
})
export class PublicAppModule { }

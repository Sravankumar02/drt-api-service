import { PipeTransform } from '@nestjs/common';
import { ApiConfigService } from 'src/common/api-config/api.config.service';
export declare class TimestampParsePipe implements PipeTransform {
    private readonly apiConfigService;
    constructor(apiConfigService: ApiConfigService);
    transform(value: any): number | undefined;
}

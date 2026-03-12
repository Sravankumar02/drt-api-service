import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiConfigService } from 'src/common/api-config/api.config.service';
export declare class LockingGuardInterceptor implements NestInterceptor {
    private readonly apiConfigService;
    private readonly locks;
    constructor(apiConfigService: ApiConfigService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}

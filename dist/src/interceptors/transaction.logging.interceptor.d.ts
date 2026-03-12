import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
export declare class TransactionLoggingInterceptor implements NestInterceptor {
    private readonly transactionLogger;
    private readonly logger;
    constructor();
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}

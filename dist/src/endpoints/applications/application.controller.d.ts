import { ApplicationService } from "./application.service";
import { Application } from "./entities/application";
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    getApplications(from: number, size: number, before?: number, after?: number, withTxCount?: boolean): Promise<Application[]>;
    getApplicationsCount(before?: number, after?: number): Promise<number>;
    getApplication(address: string): Promise<Application>;
}

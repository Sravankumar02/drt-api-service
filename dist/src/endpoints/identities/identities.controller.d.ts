import { Identity } from "./entities/identity";
import { IdentitiesService } from "./identities.service";
import { Response } from "express";
import { IdentitySortCriteria } from "./entities/identity.sort.criteria";
export declare class IdentitiesController {
    private readonly identitiesService;
    constructor(identitiesService: IdentitiesService);
    getIdentities(from: number, size: number, identities?: string[], sort?: IdentitySortCriteria[]): Promise<Identity[]>;
    getIdentity(identifier: string): Promise<Identity>;
    getIdentityAvatar(identifier: string, response: Response): Promise<void>;
}

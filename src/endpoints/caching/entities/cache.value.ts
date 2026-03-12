import { Constants } from "@sravankumar02/sdk-nestjs-common";

export class CacheValue {
  value?: string;
  ttl: number = Constants.oneSecond() * 6;
}

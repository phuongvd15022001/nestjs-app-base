import { CacheModuleOptions } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis-yet';

export const redisConfig: CacheModuleOptions = {
  store: redisStore as any,
  host: 'localhost',
  port: 6379,
  ttl: 60 * 60, // 1h
};

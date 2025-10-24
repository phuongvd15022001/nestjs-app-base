import { CacheModuleOptions } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis-yet';
import { GLOBAL_CONFIG } from './global.config';

export const redisConfig: CacheModuleOptions = {
  store: redisStore as any,
  host: GLOBAL_CONFIG.redis.host,
  port: GLOBAL_CONFIG.redis.port,
  ttl: 60 * 60, // 1h
};

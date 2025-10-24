import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  getHello(): string {
    return 'Hello World!';
  }

  async setCache() {
    await this.cacheManager.set('greeting', 'Redis Cache!', 3600);
    return 'Save cache success!';
  }

  async getCache() {
    const value = await this.cacheManager.get('greeting');
    return value || 'Not have Redis Cache';
  }
}

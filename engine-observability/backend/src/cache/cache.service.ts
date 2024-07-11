import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache, Milliseconds } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async get<T>(key: string): Promise<T | undefined> {
    return this.cacheManager.get(key);
  }

  async set(key: string, data: any, ttl?: Milliseconds): Promise<void> {
    return this.cacheManager.set(key, data, ttl);
  }

  async delete(key: string): Promise<void> {
    return this.cacheManager.del(key);
  }

  async reset(): Promise<void> {
    return this.cacheManager.reset();
  }
}

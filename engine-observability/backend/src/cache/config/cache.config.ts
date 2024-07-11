import { registerAs } from '@nestjs/config';
import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';
import { CacheConfig } from 'src/cache/config/cache-config.type';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  REDIS_PORT: number;

  @IsString()
  REDIS_HOST: string;
}

export default registerAs<CacheConfig>('cache', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
    host: process.env.REDIS_HOST,
  };
});

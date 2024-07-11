import path from 'path';
import { Module } from '@nestjs/common';
import {
  CacheModule as CacheManagerModule,
  CacheModuleAsyncOptions,
} from '@nestjs/cache-manager';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { redisStore } from 'cache-manager-redis-store';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import fileConfig from './files/config/file.config';
import googleConfig from './auth-google/config/google.config';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { ClusterMetricsModule } from './clusterMetrics/clusterMetrics.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';
import { SessionModule } from './session/session.module';
import { MailerModule } from './mailer/mailer.module';
import { MongooseConfigService } from './database/mongoose-config.service';
import { DatabaseConfig } from './database/config/database-config.type';
import { QueryMetricsModule } from './queryMetrics/queryMetrics.module';
import { WorkerMetricsModule } from './workerMetrics/workerMetrics.module';
import { ClustersModule } from './clusters/clusters.module';
import { QueriesModule } from './queries/queries.module';
import { CacheModule } from './cache/cache.module';
import cacheConfig from './cache/config/cache.config';
import { RedisService } from './pubsub/redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        googleConfig,
        cacheConfig,
      ],
      envFilePath: ['.env'],
    }),
    CacheManagerModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.getOrThrow('cache.host', {
              infer: true,
            }),
            port: configService.getOrThrow('cache.port', {
              infer: true,
            }),
          },
        });
        return {
          store: () => store,
          ttl: 5, // seconds
        };
      },
      inject: [ConfigService],
    } as CacheModuleAsyncOptions),
    (databaseConfig() as DatabaseConfig).isDocumentDatabase
      ? MongooseModule.forRootAsync({
          useClass: MongooseConfigService,
        })
      : TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
          dataSourceFactory: async (options: DataSourceOptions) => {
            return new DataSource(options).initialize();
          },
        }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    AuthGoogleModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
    ClusterMetricsModule,
    WorkerMetricsModule,
    QueryMetricsModule,
    ClustersModule,
    QueriesModule,
    CacheModule,
  ],
  providers: [RedisService],
})
export class AppModule {}

import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  RedisOptions,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private client: ClientProxy;

  constructor(private configService: ConfigService) {
    const redisHost = this.configService.getOrThrow('cache.host', {
      infer: true,
    });
    const redisPort = this.configService.getOrThrow('cache.port', {
      infer: true,
    });
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: redisHost,
        port: redisPort,
        retryAttempts: 3,
      },
    } as RedisOptions);
  }

  async publish(channel: string, message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.emit(channel, message).subscribe({
        next: () => {
          console.log('Message emitted successfully');
          resolve();
        },
        error: (err) => {
          console.error('Error emitting message:', err);
          reject(err);
        },
      });
    });
  }

  onModuleDestroy() {
    this.client.close();
  }
}

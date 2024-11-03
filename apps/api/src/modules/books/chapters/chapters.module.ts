import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      // @ts-ignore
      store: async () =>
        await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        }),
    }),
  ],
  controllers: [ChaptersController],
  providers: [ChaptersService],
})
export class ChaptersModule {}

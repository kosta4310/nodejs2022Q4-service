import {
  HttpException,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { TrackModule } from './entities/track/track.module';
import { ArtistModule } from './entities/artist/artist.module';
import { AlbumModule } from './entities/album/album.module';
import { FavoritesModule } from './entities/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { dataSourceOptions } from '../db/data-source';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AllExceptionsFilter } from './logger/all_exeption.filter';
import { APP_FILTER } from '@nestjs/core/constants';
import { MyLogger } from './logger/logger.service';
config();

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    LoggerModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private myLogger: MyLogger) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');

    process.on('uncaughtException', (err) => {
      this.myLogger.error(`uncaughtException ${err.stack}`);
    });

    process.on('unhandledRejection', (err: Error) => {
      this.myLogger.error(`unhandledRejection ${err.stack}`);
    });
  }
}

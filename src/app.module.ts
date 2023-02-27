import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { TrackModule } from './entities/track/track.module';
import { ArtistModule } from './entities/artist/artist.module';
import { AlbumModule } from './entities/album/album.module';
import { FavoritesModule } from './entities/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AllExceptionsFilter } from './logger/all_exeption.filter';
import { MyLogger } from './logger/logger.service';
import { databaseConfig } from '../db/config-database';
import { AuthModule } from './entities/auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './entities/auth/guard/jwt-auth.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
config();

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    LoggerModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  constructor(private myLogger: MyLogger) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');

    process.on('uncaughtException', (err) => {
      this.myLogger.error(
        `Uncaught Exception ... name ${err.name}, message ${err.message} For more enable debug`,
      );
      this.myLogger.debug(`Uncaught Exception ... ${err.stack}`);
    });

    process.on('unhandledRejection', (err: Error) => {
      this.myLogger.error(
        `Unhandled Rejection ... name ${err.name}, message ${err.message} For more enable debug`,
      );
      this.myLogger.debug(`Unhandled Rejection ... ${err.stack}`);
    });
  }
}

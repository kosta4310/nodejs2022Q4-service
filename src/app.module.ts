import { Module } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { TrackModule } from './entities/track/track.module';
import { ArtistModule } from './entities/artist/artist.module';
import { AlbumModule } from './entities/album/album.module';
import { FavoritesModule } from './entities/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { dataSourceOptions } from '../db/data-source';
config();

// const configService = new ConfigService();
// import { TypeOrmModule } from './db/typeorm.module';
// import { ConfigModule } from './config.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
})
export class AppModule {}

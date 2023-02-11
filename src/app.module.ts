import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { DbModule } from './db/db.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from './db/typeorm.module';
import { ConfigModule } from './config.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    DbModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    TypeOrmModule,
    ConfigModule,
  ],
})
export class AppModule {}

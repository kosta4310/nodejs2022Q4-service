import { Module } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { TrackModule } from './entities/track/track.module';
import { DbModule } from './db/db.module';
import { ArtistModule } from './entities/artist/artist.module';
import { AlbumModule } from './entities/album/album.module';
import { FavoritesModule } from './entities/favorites/favorites.module';
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

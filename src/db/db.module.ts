import { Global, Module } from '@nestjs/common';
import { AlbumDbService } from './albumDb.service';
import { ArtistDbService } from './artistDb.service';
import { FavoritesDbService } from './favoritesDb.service';
import { TrackDbService } from './trackDb.service';
import { UserDbService } from './userDb.service';

@Global()
@Module({
  providers: [UserDbService, TrackDbService, ArtistDbService, AlbumDbService, FavoritesDbService],
  exports: [UserDbService, TrackDbService, ArtistDbService, AlbumDbService, FavoritesDbService],
})
export class DbModule {}

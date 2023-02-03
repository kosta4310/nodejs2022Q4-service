import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { DbModule } from './db/db.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [UserModule, TrackModule, DbModule, ArtistModule, AlbumModule],
})
export class AppModule {}

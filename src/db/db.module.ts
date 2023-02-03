import { Global, Module } from '@nestjs/common';
import { ArtistDbService } from './artistDb.service';
import { TrackDbService } from './trackDb.service';
import { UserDbService } from './userDb.service';

@Global()
@Module({
  providers: [UserDbService, TrackDbService, ArtistDbService],
  exports: [UserDbService, TrackDbService, ArtistDbService],
})
export class DbModule {}

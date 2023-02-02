import { Global, Module } from '@nestjs/common';
import { TrackDbService } from './trackDb.service';
import { UserDbService } from './userDb.service';

@Global()
@Module({
  providers: [UserDbService, TrackDbService],
  exports: [UserDbService, TrackDbService],
})
export class DbModule {}

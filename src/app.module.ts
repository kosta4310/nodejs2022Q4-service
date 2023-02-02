import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
// import { DbModule } from './db/db.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [UserModule, TrackModule, DbModule],
})
export class AppModule {}

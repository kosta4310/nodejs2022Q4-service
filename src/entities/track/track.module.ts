import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';
import { Track } from './track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist, Track])],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}

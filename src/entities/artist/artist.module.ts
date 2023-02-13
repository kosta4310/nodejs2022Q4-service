import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album, Track])],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}

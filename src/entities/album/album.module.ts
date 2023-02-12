import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artist/artist.entity';
import { ArtistModule } from '../artist/artist.module';
import { AlbumController } from './album.controller';
import { Album } from './album.entity';
import { AlbumService } from './album.service';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist])],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}

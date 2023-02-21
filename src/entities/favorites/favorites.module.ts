import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesAlbum } from './favoriteEntities/favAlbum.entity';
import { FavoritesArtist } from './favoriteEntities/favArtist.entity';
import { FavoritesTrack } from './favoriteEntities/favTrack.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesAlbum, FavoritesArtist, FavoritesTrack]),
  ],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}

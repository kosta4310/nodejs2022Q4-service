import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesAlbum } from './favAlbum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritesAlbum])],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}

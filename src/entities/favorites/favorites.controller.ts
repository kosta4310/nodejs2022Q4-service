import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAccessAuthGuard } from '../auth/guard/jwt-auth.guard';
import { FavoritesService } from './favorites.service';
import { FavoriteEntity } from './utils/favEntity';

@UseGuards(JwtAccessAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getAll() {
    return await this.favoritesService.getAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const favorite = await this.favoritesService.addTrack(id);
    return new FavoriteEntity(favorite);
  }

  @HttpCode(204)
  @Delete('track/:id')
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteTrack(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const favorite = await this.favoritesService.addAlbum(id);
    return new FavoriteEntity(favorite);
  }

  @HttpCode(204)
  @Delete('album/:id')
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteAlbum(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const favorite = await this.favoritesService.addArtist(id);
    return new FavoriteEntity(favorite);
  }

  @HttpCode(204)
  @Delete('artist/:id')
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteArtist(id);
  }
}

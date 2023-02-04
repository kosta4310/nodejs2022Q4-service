import { HttpException, Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/artist/dto/createArtistDto';
import { AlbumDbService } from 'src/db/albumDb.service';
import { FavoritesDbService } from 'src/db/favoritesDb.service';
import { TrackDbService } from 'src/db/trackDb.service';
import { UserDbService } from 'src/db/userDb.service';
import { CreateAlbumDto } from './dto/createAlbumDto';
import { UpdateAlbumDto } from './dto/updateAlbumDto';

@Injectable()
export class AlbumService {
  constructor(
    private albumDb: AlbumDbService,
    private trackDb: TrackDbService,
    private favDb: FavoritesDbService
  ) { }

  async getAll() {
    return await this.albumDb.getAll();
  }

  async createAlbum(album: CreateAlbumDto) {
    return await this.albumDb.create(album);
  }

  async getAlbum(id: string) {
    const album = await this.albumDb.getOne(id);
    if (!album) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
    return album;
  }

  async updateAlbum(id: string, data: UpdateAlbumDto) {
    try {
      const updatedAlbum = await this.albumDb.update(id, data);
      return updatedAlbum;
    } catch (error) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
  }

  async deleteAlbum(id: string) {
    const album = await this.albumDb.delete(id);
    if (!album) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
    const track = this.trackDb.findMany('albumId', id);
    this.favDb.delete('albums', id);
    const entities = await Promise.all([track]);
    entities.forEach(entity => entity.forEach((entity)  => entity.albumId = null));
    return album;
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/artist/dto/createArtistDto';
import { AlbumDbService } from 'src/db/albumDb.service';
import { UserDbService } from 'src/db/userDb.service';
import { CreateAlbumDto } from './dto/createAlbumDto';

@Injectable()
export class AlbumService {
  constructor(private albumDb: AlbumDbService) {}

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

  async updateAlbum(id: string, data: CreateAlbumDto) {
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
    return album;
  }
}

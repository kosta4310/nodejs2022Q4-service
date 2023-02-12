import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Album } from './album.entity';
import { CreateAlbumDto } from './dto/createAlbumDto';
import { UpdateAlbumDto } from './dto/updateAlbumDto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>, // private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async getAll() {
    return await this.albumRepository.find();
  }

  async createAlbum(albumData: CreateAlbumDto) {
    // let artist: Artist;
    // if (albumData.artistId) {
    //   artist = await this.artistRepository.findOneBy({
    //     id: albumData.artistId,
    //   });
    //   if (!artist) {
    //     throw new HttpException(
    //       `Artist with id === ${albumData.artistId} doesn't exist`,
    //       422,
    //     );
    //   }
    // }
    try {
      const newAlbum = this.albumRepository.create(albumData);
      return await this.albumRepository.save(newAlbum);
    } catch (error) {
      throw new HttpException(
        `May be artist with id === ${albumData.artistId} doesn't exist`,
        404,
      );
    }
  }

  async getAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
    return album;
  }

  async updateAlbum(id: string, data: UpdateAlbumDto) {
    // try {
    //   const updatedAlbum = await this.albumRepository.update(id, data);
    //   return updatedAlbum;
    // } catch (error) {
    //   throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    // }
    const entity = await this.albumRepository.findOneBy({ id });
    if (!entity) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        entity[key] = element;
      }
    }
    try {
      await this.albumRepository.update({ id }, data);
    } catch (error) {
      throw new HttpException(
        `May be artist with passed id doesn't exist`,
        404,
      );
    }
    return entity;
  }

  // async deleteAlbum(id: string) {
  //   const album = await this.albumDb.delete(id);
  //   if (!album) {
  //     throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  //   }
  //   const track = this.trackDb.findMany('albumId', id);
  //   this.favDb.delete('albums', id);
  //   const entities = await Promise.all([track]);
  //   entities.forEach((entity) =>
  //     entity.forEach((entity) => (entity.albumId = null)),
  //   );
  //   return album;
  // }
}

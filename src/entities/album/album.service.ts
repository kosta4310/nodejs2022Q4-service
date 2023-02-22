import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { CreateAlbumDto } from './dto/createAlbumDto';
import { UpdateAlbumDto } from './dto/updateAlbumDto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async getAll() {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async createAlbum(albumData: CreateAlbumDto) {
    try {
      const newAlbum = this.albumRepository.create(albumData);
      return await this.albumRepository.save(newAlbum);
    } catch (error) {
      if (error.code === '23503') {
        throw new NotFoundException(`An artist with passed id doesn't exist`);
      }
      throw new Error();
    }
  }

  async getAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }
    return album;
  }

  async updateAlbum(id: string, data: UpdateAlbumDto) {
    const entity = await this.albumRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    Object.entries(data).forEach(([key, value]) => (entity[key] = value));

    try {
      await this.albumRepository.update({ id }, data);
    } catch (error) {
      if (error.code === '23503') {
        throw new NotFoundException(`An artist with passed id doesn't exist`);
      }
      throw new Error();
    }
    return entity;
  }

  async deleteAlbum(id: string) {
    const { affected } = await this.albumRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }
  }
}

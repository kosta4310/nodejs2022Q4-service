import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/album/dto/createAlbumDto';
import { UpdateAlbumDto } from 'src/album/dto/updateAlbumDto';
import { Album } from 'src/album/interfaces/album.interface';
import crypto from 'node:crypto';

@Injectable()
export class AlbumDbService {
  private db: Album[] = [];

  async getAll() {
    return this.db;
  }

  async create(data: CreateAlbumDto) {
    const id = crypto.randomUUID({ disableEntropyCache: true });
    if (!data.artistId) data.artistId = null;
    const album = Object.assign(data, { id });
    this.db.push(album);
    return album;
  }

  async getOne(id: string) {
    return this.db.find((album) => album.id === id);
  }

  async update(id: string, data: UpdateAlbumDto) {
    const album = this.db.find((album) => album.id === id);
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        album[key] = value;
      }
    }
    return album;
  }

  async delete(id: string) {
    const album = this.db.find((album) => album.id === id);
    this.db = this.db.filter((album) => album.id !== id);
    return album;
  }

  async findMany(key: string, value: any) {
    let res: Album[];
    if (typeof value === 'string') {
      res = this.db.filter((album) => album[key] === value);
    } else if (Array.isArray(value)) {
      res = this.db.filter((album) => value.includes(album[key]));
    }

    return res;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/album/dto/createAlbumDto';
import { Album } from 'src/album/interfaces/album.interface';
const crypto = require('node:crypto');

@Injectable()
export class AlbumDbService {
  private db: Album[] = [];

  async getAll() {
    return this.db;
  }

  async create(data: CreateAlbumDto) {
    const id = crypto.randomUUID({ disableEntropyCache: true });
    const album = Object.assign(data, { id });
    this.db.push(album);
    return album;
  }

  async getOne(id: string) {
    return this.db.find(track => track.id === id);
  }

  async update(id: string, data: CreateAlbumDto) {
    const track = this.db.find(track => track.id === id);
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        track[key] = value;
      }
    }
    return track;
  }

  async delete(id: string) {
    const track = this.db.find(track => track.id === id);
    this.db = this.db.filter(track => track.id !== id);
    return track;
  }
}

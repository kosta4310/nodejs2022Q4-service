import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/artist/dto/createArtistDto';
import { UpdateArtistDto } from 'src/artist/dto/updateArtistDto';
import { randomUUID } from 'node:crypto';
import { Artist } from 'src/artist/interfaces/artist.interface';

@Injectable()
export class ArtistDbService {
  private db: Artist[] = [];

  async getAll() {
    return this.db;
  }

  async create(artist: CreateArtistDto) {
    const id = randomUUID({ disableEntropyCache: true });
    const newArtist = Object.assign(artist, { id });
    this.db.push(newArtist);
    return newArtist;
  }

  async getOne(id: string) {
    return this.db.find((artist) => artist.id === id);
  }

  async update(id: string, data: UpdateArtistDto) {
    const artist = this.db.find((artist) => artist.id === id);
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        artist[key] = value;
      }
    }

    return artist;
  }

  async delete(id: string) {
    const artist = this.db.find((artist) => artist.id === id);
    this.db = this.db.filter((artist) => artist.id !== id);
    return artist;
  }

  async findMany(key: string, value: any) {
    let res: Artist[];
    if (typeof value === 'string') {
      res = this.db.filter((artist) => artist[key] === value);
    } else if (Array.isArray(value)) {
      res = this.db.filter((artist) => value.includes(artist[key]));
    }

    return res;
  }
}

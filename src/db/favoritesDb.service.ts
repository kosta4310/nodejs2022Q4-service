import { Injectable } from '@nestjs/common';
import { Favorites } from 'src/entities/favorites/interfaces/favofites.interface';

@Injectable()
export class FavoritesDbService {
  private db: Favorites = {
    artists: [], // favorite artists ids
    albums: [], // favorite albums ids
    tracks: [], // favorite tracks ids
  };

  async getAll() {
    return this.db;
  }

  async add(key: string, id: string) {
    this.db[key].push(id);
    return { id, success: true };
  }

  async getOne(key: string, id: string) {
    return this.db[key].includes(id);
  }

  async delete(key: string, id: string) {
    const entityId = this.db[key].includes(id);
    if (!entityId) return entityId;
    this.db[key] = this.db[key].filter((entityId: string) => entityId !== id);
    return id;
  }
  // async create(artist: CreateArtistDto) {
  //   const id = crypto.randomUUID({ disableEntropyCache: true });
  //   const newArtist = Object.assign(artist, { id });
  //   this.db.push(newArtist);
  //   return newArtist;
  // }

  // async getOne(id: string) {
  //   return this.db.find((artist) => artist.id === id);
  // }

  // async update(id: string, data: UpdateArtistDto) {
  //   const artist = this.db.find((artist) => artist.id === id);
  //   for (const key in data) {
  //     if (Object.prototype.hasOwnProperty.call(data, key)) {
  //       const value = data[key];
  //       artist[key] = value;
  //     }
  //   }

  //   return artist;
  // }

  // async delete(id: string) {
  //   const artist = this.db.find((artist) => artist.id === id);
  //   this.db = this.db.filter((artist) => artist.id !== id);
  //   return artist;
  // }
}

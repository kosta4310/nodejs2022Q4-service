import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateTrackDto } from 'src/track/dto/createTrackDto';
import { Track } from 'src/track/interfaces/track.interface';

@Injectable()
export class TrackDbService {
  private db: Track[] = [];

  async getAll() {
    return this.db;
  }

  async create(data: CreateTrackDto) {
    const id = randomUUID({ disableEntropyCache: true });
    if (!data.albumId) data.albumId = null;
    if (!data.artistId) data.artistId = null;
    const track = Object.assign(data, { id });
    this.db.push(track);
    return track;
  }

  async getOne(id: string) {
    return this.db.find((track) => track.id === id);
  }

  async update(id: string, data: CreateTrackDto) {
    const track = this.db.find((track) => track.id === id);
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        track[key] = value;
      }
    }
    return track;
  }

  async delete(id: string) {
    const track = this.db.find((track) => track.id === id);
    this.db = this.db.filter((track) => track.id !== id);
    return track;
  }

  async findMany(key: string, value: any) {
    let res: Track[];
    if (typeof value === 'string') {
      res = this.db.filter((track) => track[key] === value);
    } else if (Array.isArray(value)) {
      res = this.db.filter((track) => value.includes(track[key]));
    }

    return res;
  }
}

import { Injectable } from '@nestjs/common';
const crypto = require('node:crypto');
import { CreateTrackDto } from 'src/track/dto/createTrackDto';
import { Track } from 'src/track/interfaces/track.interface';

@Injectable()
export class TrackDbService {
  private db: Track[] = [];

  async getAll() {
    return this.db;
  }

  async create(data: CreateTrackDto) {
    const id = crypto.randomUUID({ disableEntropyCache: true });
    const track = Object.assign(data, { id });
    this.db.push(track);
    return track;
  }

  async getOne(id: string) {
    return this.db.find(track => track.id === id);
  }

  async update(id: string, data: CreateTrackDto) {
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

import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackDbService {
  private db: any[] = ['track1', 'track2']
  getAll() {
    return this.db;
  }
  create(track: string) {
    this.db.push(track);
    return track;
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { TrackDbService } from 'src/db/trackDb.service';
import { UserDbService } from 'src/db/userDb.service';
import { CreateTrackDto } from './dto/createTrackDto';

@Injectable()
export class TrackService {
  constructor(private trackDb: TrackDbService) { }
  
  async getAll() {
    return await this.trackDb.getAll();
  }

  async createTrack(track: CreateTrackDto) {
    return await this.trackDb.create(track);
  }

  async getTrack(id: string) {
    const track = await this.trackDb.getOne(id);
    if (!track) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404)
    }
    return track
  }

  async updateTrack(id: string, data: CreateTrackDto) {
    try {
      const updatedTrack = await this.trackDb.update(id, data);
      return updatedTrack;
    } catch (error) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404)
    }
  }

  async deleteTrack(id: string) {
    const track = await this.trackDb.delete(id);
    if (!track) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404)
    }
    return track;
  }  
}

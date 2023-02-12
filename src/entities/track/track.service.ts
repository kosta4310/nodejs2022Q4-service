import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesDbService } from 'src/db/favoritesDb.service';
import { TrackDbService } from 'src/db/trackDb.service';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/createTrackDto';
import { Track } from './track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async getAll() {
    return await this.trackRepository.find();
  }

  async createTrack(track: CreateTrackDto) {
    try {
      const newTrack = await this.trackRepository.create(track);
      return await this.trackRepository.save(newTrack);
    } catch (error) {
      throw new HttpException(
        `May be artist or album with passed id doesn't exist`,
        404,
      );
    }
  }

  async getTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
    return track;
  }

  async updateTrack(id: string, data: CreateTrackDto) {
    const entity = await this.trackRepository.findOneBy({ id });
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
      await this.trackRepository.update({ id }, data);
    } catch (error) {
      throw new HttpException(
        `May be artist or album with passed id doesn't exist`,
        404,
      );
    }
    return entity;

    // try {
    //   const updatedTrack = await this.trackRepository.update(id, data);
    //   return updatedTrack;
    // } catch (error) {
    //   throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    // }
  }

  // async deleteTrack(id: string) {
  //   const track = await this.trackDb.delete(id);
  //   if (!track) {
  //     throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  //   }
  //   this.favDb.delete('tracks', id);

  //   return track;
  // }
}

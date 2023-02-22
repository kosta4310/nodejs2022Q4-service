import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  async createTrack(track: CreateTrackDto) {
    try {
      const newTrack = this.trackRepository.create(track);
      const savedTrack = await this.trackRepository.save(newTrack);
      return savedTrack;
    } catch (error) {
      if (error.code === '23503') {
        throw new NotFoundException(
          `An artist or an album with passed id doesn't exist`,
        );
      }
      throw new Error();
    }
  }

  async getTrack(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }
    return track;
  }

  async updateTrack(id: string, data: CreateTrackDto) {
    const entity = await this.trackRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    Object.entries(data).forEach(([key, value]) => (entity[key] = value));

    try {
      await this.trackRepository.update({ id }, data);
    } catch (error) {
      if (error.code === '23503') {
        throw new NotFoundException(
          `An artist or an album with passed id doesn't exist`,
        );
      }
      throw new Error();
    }
    return entity;
  }

  async deleteTrack(id: string) {
    const { affected } = await this.trackRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }
  }
}

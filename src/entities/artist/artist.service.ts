import { HttpException, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/createArtistDto';
import { UpdateArtistDto } from './dto/updateArtistDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>, // @InjectRepository(Album) // private readonly albumRepository: Repository<Album>, // @InjectRepository(Track) // private readonly trackRepository: Repository<Track>,
  ) {}

  async getAllArtists() {
    return await this.artistRepository.find();
  }

  async createArtist(artistData: CreateArtistDto) {
    const newArtist = this.artistRepository.create(artistData);
    return await this.artistRepository.save(newArtist);
  }

  async getArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
    return artist;
  }

  async updateArtist(id: string, data: UpdateArtistDto) {
    const entity = await this.artistRepository.findOneBy({ id });
    if (!entity) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        entity[key] = element;
      }
    }
    await this.artistRepository.update({ id }, data);
    return entity;
  }

  async deleteArtist(id: string) {
    const { affected } = await this.artistRepository.delete(id);
    if (!affected) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
    return;
  }
}

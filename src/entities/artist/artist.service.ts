import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/createArtistDto';
import { UpdateArtistDto } from './dto/updateArtistDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async getAllArtists() {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async createArtist(artistData: CreateArtistDto) {
    const newArtist = this.artistRepository.create(artistData);
    const createdArtist = await this.artistRepository.save(newArtist);
    return createdArtist;
  }

  async getArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }
    return artist;
  }

  async updateArtist(id: string, data: UpdateArtistDto) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    Object.entries(data).forEach(([key, value]) => (artist[key] = value));

    await this.artistRepository.update({ id }, data);
    return artist;
  }

  async deleteArtist(id: string) {
    const { affected } = await this.artistRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { ArtistDbService } from 'src/db/artistDb.service';
import { CreateArtistDto } from './dto/createArtistDto';

@Injectable()
export class ArtistService {
  constructor(private artistDb: ArtistDbService) { }

  async getAllArtists() {
    return await this.artistDb.getAll();
  }

  async createArtist(artist: CreateArtistDto) {
    return await this.artistDb.create(artist);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/artist/dto/createArtistDto';
const crypto = require('node:crypto');
import { Artist } from 'src/artist/interfaces/artist.interface';

@Injectable()
export class ArtistDbService {
  private db: Artist[] = [];

  async getAll() {
    return this.db;
  }
  
  create(artist: CreateArtistDto) {
    const id = crypto.randomUUID({ disableEntropyCache: true });
    const newArtist = Object.assign(artist, { id });
    this.db.push(newArtist);
    return newArtist;
  }
}
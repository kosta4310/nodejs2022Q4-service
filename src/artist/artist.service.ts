import { HttpException, Injectable } from '@nestjs/common';
import { Album } from 'src/album/interfaces/album.interface';
import { AlbumDbService } from 'src/db/albumDb.service';
import { ArtistDbService } from 'src/db/artistDb.service';
import { TrackDbService } from 'src/db/trackDb.service';
import { Track } from 'src/track/interfaces/track.interface';
import { CreateArtistDto } from './dto/createArtistDto';
import { UpdateArtistDto } from './dto/updateArtistDto';

@Injectable()
export class ArtistService {
  constructor(
    private artistDb: ArtistDbService,
    private albumDb: AlbumDbService,
    private trackDb: TrackDbService
  ) { }

  async getAllArtists() {
    return await this.artistDb.getAll();
  }

  async createArtist(artist: CreateArtistDto) {
    return await this.artistDb.create(artist);
  }

  async getArtist(id: string) {
    const artist = await this.artistDb.getOne(id);
    if (!artist) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
    return artist;
  }

  async updateArtist(id: string, data: UpdateArtistDto) {
    try {
      const updatedArtist = await this.artistDb.update(id, data);
      return updatedArtist;
    } catch (error) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
  }

  async deleteArtist(id: string) {
    const artist = await this.artistDb.delete(id);
    if (!artist) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
    const album = this.albumDb.findMany('artistId', id);
    const track = this.trackDb.findMany('artistId', id);

    const entities = await Promise.all([album, track]);
    entities.forEach(entity => entity.forEach((entity: Album | Track)  => entity.artistId = null));
    return artist;
  }
}

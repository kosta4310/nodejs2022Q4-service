import { HttpException, Injectable } from '@nestjs/common';
import { Album } from 'src/entities/album/interfaces/album.interface';
import { AlbumDbService } from 'src/db/albumDb.service';
import { ArtistDbService } from 'src/db/artistDb.service';
import { FavoritesDbService } from 'src/db/favoritesDb.service';
import { TrackDbService } from 'src/db/trackDb.service';
import { Track } from 'src/entities/track/interfaces/track.interface';
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
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        artist[key] = element;
      }
    }
    return await this.artistRepository.save(artist);

    // try {
    //   const updatedArtist = await this.artistRepository.update(id, data);
    //   return updatedArtist;
    // } catch (error) {
    //   throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    // }
  }

  // async deleteArtist(id: string) {
  //   const artist = await this.artistDb.delete(id);
  //   if (!artist) {
  //     throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  //   }

  //   const album = this.albumDb.findMany('artistId', id);
  //   const track = this.trackDb.findMany('artistId', id);
  //   this.favDb.delete('artists', id);

  //   const entities = await Promise.all([album, track]);
  //   entities.forEach((entity) =>
  //     entity.forEach((entity: Album | Track) => (entity.artistId = null)),
  //   );

  //   return artist;
  // }
}

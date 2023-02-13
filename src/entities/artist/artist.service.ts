import { HttpException, Injectable } from '@nestjs/common';
import { AlbumDbService } from 'src/db/albumDb.service';
import { ArtistDbService } from 'src/db/artistDb.service';
import { FavoritesDbService } from 'src/db/favoritesDb.service';
import { TrackDbService } from 'src/db/trackDb.service';
import { CreateArtistDto } from './dto/createArtistDto';
import { UpdateArtistDto } from './dto/updateArtistDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
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
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }

    const album = this.albumRepository.find({ where: { artistId: id } });
    const track = this.trackRepository.find({ where: { artistId: id } });
    // this.favDb.delete('artists', id);

    const [albumEntities, trackEntities] = await Promise.all([album, track]);

    const albumPromises = albumEntities.map((entity) => {
      return this.albumRepository.update(entity.id, { artistId: null });
    });
    const trackPromises = trackEntities.map((entity) => {
      return this.trackRepository.update(entity.id, { artistId: null });
    });

    await Promise.all([albumPromises, trackPromises]);
    return artist;
  }
}

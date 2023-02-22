import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesAlbum } from './favoriteEntities/favAlbum.entity';
import { FavoritesArtist } from './favoriteEntities/favArtist.entity';
import { FavoritesTrack } from './favoriteEntities/favTrack.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesAlbum)
    private readonly favAlbumRepository: Repository<FavoritesAlbum>,
    @InjectRepository(FavoritesArtist)
    private readonly favArtistRepository: Repository<FavoritesArtist>,
    @InjectRepository(FavoritesTrack)
    private readonly favTrackRepository: Repository<FavoritesTrack>,
  ) {}

  async getAll() {
    const [rawAlbums, rawArtists, rawTracks] = await Promise.all([
      this.favAlbumRepository.find({
        relations: { album: true },
      }),
      this.favArtistRepository.find({
        relations: { artist: true },
      }),
      this.favTrackRepository.find({
        relations: { track: true },
      }),
    ]);

    const albums = rawAlbums.map((rawAlbum) => rawAlbum.album);

    const artists = rawArtists.map((rawArtist) => rawArtist.artist);

    const tracks = rawTracks.map((rawTrack) => rawTrack.track);

    return { albums, artists, tracks };
  }

  async addTrack(id: string) {
    const track = this.favTrackRepository.create({ trackId: id });
    try {
      const savedTrack = await this.favTrackRepository.save(track);
      return savedTrack;
    } catch (error) {
      if (error.code === '23503') {
        throw new UnprocessableEntityException(
          `Record with id === ${id} doesn't exist`,
        );
      }
      throw new Error();
    }
  }

  async deleteTrack(id: string) {
    const { affected } = await this.favTrackRepository.delete({ trackId: id });
    if (!affected) {
      throw new NotFoundException(
        `Record with id === ${id} doesn't exist in favorites`,
      );
    }
  }

  async addAlbum(id: string) {
    const album = this.favAlbumRepository.create({ albumId: id });
    try {
      const savedAlbum = await this.favAlbumRepository.save(album);
      return savedAlbum;
    } catch (error) {
      if (error.code === '23503') {
        throw new UnprocessableEntityException(
          `Record with id === ${id} doesn't exist`,
        );
      }
      throw new Error();
    }
  }

  async deleteAlbum(id: string) {
    const { affected } = await this.favAlbumRepository.delete({ albumId: id });
    if (!affected) {
      throw new NotFoundException(
        `Record with id === ${id} doesn't exist in favorites`,
      );
    }
  }

  async addArtist(id: string) {
    const artist = this.favArtistRepository.create({ artistId: id });
    try {
      const savedArtist = await this.favArtistRepository.save(artist);
      return savedArtist;
    } catch (error) {
      if (error.code === '23503') {
        throw new UnprocessableEntityException(
          `Record with id === ${id} doesn't exist`,
        );
      }
      throw new Error();
    }
  }

  async deleteArtist(id: string) {
    const { affected } = await this.favArtistRepository.delete({
      artistId: id,
    });
    if (!affected) {
      throw new NotFoundException(
        `Record with id === ${id} doesn't exist in favorites`,
      );
    }
  }
}

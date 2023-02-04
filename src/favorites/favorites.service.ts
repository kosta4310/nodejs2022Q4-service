import { forwardRef, HttpException, Injectable } from '@nestjs/common';
import { AlbumDbService } from 'src/db/albumDb.service';
import { ArtistDbService } from 'src/db/artistDb.service';
import { FavoritesDbService } from 'src/db/favoritesDb.service';
import { TrackDbService } from 'src/db/trackDb.service';

@Injectable()
export class FavoritesService {
  constructor(
    private favoritesDb: FavoritesDbService,
    private trackDb: TrackDbService,
    private albumDb: AlbumDbService,
    private artistDb: ArtistDbService
  ) { }

  async getAll() {
    const favofites = await this.favoritesDb.getAll();
    const albums = await this.albumDb.findMany('id', favofites.albums);
    const tracks = await this.trackDb.findMany('id', favofites.tracks);
    const artists = await this.artistDb.findMany('id', favofites.artists);
    return { albums, tracks, artists};
    
  }

  async addTrack(id: string) {
    const track = await this.trackDb.getOne(id);
    if (!track) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 422);
    }
    return await this.favoritesDb.add('tracks', id);
  }

  async deleteTrack(id: string) {
    const res = await this.favoritesDb.delete('tracks', id);
    if (!res) {
      throw new HttpException(`Record with id === ${id} doesn't exist in favorites`, 404);
    }
    return res;
  }

  async addAlbum(id: string) {
    const album = await this.albumDb.getOne(id);
    if (!album) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 422);
    }
    return await this.favoritesDb.add('albums', id);
  }

  async deleteAlbum(id: string) {
    const res = await this.favoritesDb.delete('albums', id);
    if (!res) {
      throw new HttpException(`Record with id === ${id} doesn't exist in favorites`, 404);
    }
    return res;
  }

  async addArtist(id: string) {
    const artist = await this.artistDb.getOne(id);
    if (!artist) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 422);
    }
    return await this.favoritesDb.add('artists', id);
  }

  async deleteArtist(id: string) {
    const res = await this.favoritesDb.delete('artists', id);
    if (!res) {
      throw new HttpException(`Record with id === ${id} doesn't exist in favorites`, 404);
    }
    return res;
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumDbService } from 'src/db/albumDb.service';
import { ArtistDbService } from 'src/db/artistDb.service';
import { FavoritesDbService } from 'src/db/favoritesDb.service';
import { TrackDbService } from 'src/db/trackDb.service';
import { Repository } from 'typeorm';
import { FavoritesAlbum } from './favAlbum.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesAlbum)
    private readonly favAlbumRepository: Repository<FavoritesAlbum>,
  ) {}

  async getAll() {
    const favofites = await this.favAlbumRepository.find({
      relations: { album: true },
    });
    console.log(favofites);

    return favofites;
  }

  // async addTrack(id: string) {
  //   const track = await this.trackDb.getOne(id);
  //   if (!track) {
  //     throw new HttpException(`Record with id === ${id} doesn't exist`, 422);
  //   }
  //   return await this.favoritesDb.add('tracks', id);
  // }

  // async deleteTrack(id: string) {
  //   const res = await this.favoritesDb.delete('tracks', id);
  //   if (!res) {
  //     throw new HttpException(
  //       `Record with id === ${id} doesn't exist in favorites`,
  //       404,
  //     );
  //   }
  //   return res;
  // }

  async addAlbum(id: string) {
    const album = this.favAlbumRepository.create({ albumId: id });
    try {
      return await this.favAlbumRepository.save(album);
    } catch (error) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 422);
    }

    // if (!album) {
    //   throw new HttpException(`Record with id === ${id} doesn't exist`, 422);
    // }
    // return await this.favAlbumRepository.add('albums', id);
  }

  async deleteAlbum(id: string) {
    const { affected } = await this.favAlbumRepository.delete({ albumId: id });
    if (!affected) {
      throw new HttpException(
        `Record with id === ${id} doesn't exist in favorites`,
        404,
      );
    }
    return;
  }

  // async addArtist(id: string) {
  //   const artist = await this.artistDb.getOne(id);
  //   if (!artist) {
  //     throw new HttpException(`Record with id === ${id} doesn't exist`, 422);
  //   }
  //   return await this.favoritesDb.add('artists', id);
  // }

  // async deleteArtist(id: string) {
  //   const res = await this.favoritesDb.delete('artists', id);
  //   if (!res) {
  //     throw new HttpException(
  //       `Record with id === ${id} doesn't exist in favorites`,
  //       404,
  //     );
  //   }
  //   return res;
  // }
}

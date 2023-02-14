import { Exclude } from 'class-transformer';

export class FavoriteEntity {
  albumId?: string;
  artistId?: string;
  trackId?: string;

  @Exclude()
  id: number;

  constructor(partial: Partial<FavoriteEntity>) {
    Object.assign(this, partial);
  }
}

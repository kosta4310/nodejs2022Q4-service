import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from '../../album/album.entity';

@Entity('favorites_album')
export class FavoritesAlbum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'album_id', type: 'uuid' })
  albumId: string | null;

  @ManyToOne(() => Album, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'album_id', referencedColumnName: 'id' })
  album: Album;
}

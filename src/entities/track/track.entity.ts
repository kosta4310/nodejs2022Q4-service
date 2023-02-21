import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';

@Entity('track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'duration', type: 'int' })
  duration: number;

  @Column({ name: 'artist_id', type: 'uuid', default: null })
  artistId: string | null;

  @Column({ name: 'album_id', type: 'uuid', default: null })
  albumId: string | null;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artist_id', referencedColumnName: 'id' })
  artist: Artist;

  @ManyToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'album_id', referencedColumnName: 'id' })
  album: Album;
}

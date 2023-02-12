import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => Artist)
  @JoinColumn({ name: 'artist_id', referencedColumnName: 'id' })
  artist: Artist;

  @ManyToOne(() => Album)
  @JoinColumn({ name: 'album_id', referencedColumnName: 'id' })
  album: Album;

  // @OneToMany(() => Album, (album) => album.artistId) // note: we will create author property in the Photo class below
  // albums: Album[];
  //   id: string; // uuid v4
  //   name: string;
  //   artistId: string | null; // refers to Artist
  //   albumId: string | null; // refers to Album
  //   duration: number; // integer number
}

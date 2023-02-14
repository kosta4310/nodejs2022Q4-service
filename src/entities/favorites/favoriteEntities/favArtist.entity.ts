import { Artist } from 'src/entities/artist/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('favorites_artist')
export class FavoritesArtist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'artist_id', type: 'uuid' })
  artistId: string | null;

  @ManyToOne(() => Artist, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artist_id', referencedColumnName: 'id' })
  artist: Artist;
}

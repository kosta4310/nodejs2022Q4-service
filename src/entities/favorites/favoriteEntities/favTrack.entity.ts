import { Track } from 'src/entities/track/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('favorites_track')
export class FavoritesTrack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'track_id', type: 'uuid' })
  trackId: string | null;

  @ManyToOne(() => Track, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'track_id', referencedColumnName: 'id' })
  track: Track;
}

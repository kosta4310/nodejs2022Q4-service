import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../album/album.entity';

@Entity('artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'grammy', type: 'boolean' })
  grammy: boolean;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  // @OneToMany(() => Album, (album) => album.artistId) // note: we will create author property in the Photo class below
  // albums: Album[];
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'login', type: 'varchar' })
  login: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @VersionColumn({ name: 'version', type: 'int' })
  version: number;

  //   @Column({ name: 'created_at', type: 'int' })
  //   createdAt: number;

  //   @Column({ name: 'updated_at', type: 'int' })
  //   updatedAt: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    transformer: {
      from(value: Date): number {
        return value.getTime();
      },
      to(value: Date) {
        return value;
      },
    },
  })
  createdAt: number;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    transformer: {
      from(value: Date): number {
        return value.getTime();
      },
      to(value: Date) {
        return value;
      },
    },
  })
  updatedAt: number;

  // @OneToMany(() => Album, (album) => album.artistId) // note: we will create author property in the Photo class below
  // albums: Album[];
  //   id: string; // uuid v4
  //   login: string;
  //   password: string;
  //   version: number; // integer number, increments on update
  //   createdAt: number; // timestamp of creation
  //   updatedAt: number; // timestamp of last update
}

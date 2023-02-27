import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'login', type: 'varchar', unique: true })
  login: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @VersionColumn({ name: 'version', type: 'int' })
  version: number;

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
}

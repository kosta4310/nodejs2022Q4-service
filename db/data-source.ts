// import { Module } from '@nestjs/common';
// import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { Album } from 'src/entities/album/album.entity';
import { Artist } from 'src/entities/artist/artist.entity';
import { FavoritesAlbum } from 'src/entities/favorites/favoriteEntities/favAlbum.entity';
import { FavoritesArtist } from 'src/entities/favorites/favoriteEntities/favArtist.entity';
import { FavoritesTrack } from 'src/entities/favorites/favoriteEntities/favTrack.entity';
import { Track } from 'src/entities/track/track.entity';
import { User } from 'src/entities/user/user.entity';

// @Module({
//   imports: [
//     NestTypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'postgres15',
//       port: Number(process.env.POSTGRES_PORT),
//       username: process.env.POSTGRES_USER,
//       password: process.env.POSTGRES_PASSWORD,
//       database: process.env.POSTGRES_DB,
//       synchronize: true,
//       entities: [
// Artist,
// Album,
// Track,
// User,
// FavoritesAlbum,
// FavoritesArtist,
// FavoritesTrack,
//       ],
//       // ,entities: ['dist/entities/**/*.entity.js']
//     }),
//   ],
// })
// export class TypeOrmModule {}

import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'postgres15',
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: ['dist/src/entities/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsRun: true,
  synchronize: false,
};

export default new DataSource(dataSourceOptions);

import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { Album } from 'src/entities/album/album.entity';
import { Artist } from 'src/entities/artist/artist.entity';
import { FavoritesAlbum } from 'src/entities/favorites/favAlbum.entity';
import { Track } from 'src/entities/track/track.entity';
import { User } from 'src/entities/user/user.entity';

@Module({
  imports: [
    NestTypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres15',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: [Artist, Album, Track, User, FavoritesAlbum],
      // entities: ['dist/entities/**/*.entity.js'],
    }),
  ],
})
export class TypeOrmModule {}

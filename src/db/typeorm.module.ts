import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    NestTypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres15',
      port: 5432,
      username: 'kos',
      password: 'kos',
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: ['dist/entities/**/*.entity.js'],
    }),
  ],
})
export class TypeOrmModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';

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
      entities: ['dist/entities/**/*.entity.js'],
    }),
  ],
})
export class TypeOrmModule {}

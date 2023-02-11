import { Module } from '@nestjs/common';
import { ConfigModule as NestCofigModule } from '@nestjs/config';

@Module({
  imports: [NestCofigModule.forRoot()],
})
export class ConfigModule {}

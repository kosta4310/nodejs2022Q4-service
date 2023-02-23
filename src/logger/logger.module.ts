import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { MyLogger } from './logger.service';

@Module({
  providers: [MyLogger, LoggerMiddleware],
  exports: [LoggerMiddleware, MyLogger],
})
export class LoggerModule {}

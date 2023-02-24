import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private myLogger: MyLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.myLogger.setContext(req.baseUrl);

    const { method, query, body } = req;

    next();

    res.on('finish', () => {
      const { statusCode } = res;

      const logMessage = `Request: ${method}, query ${JSON.stringify(
        query,
      )},body ${JSON.stringify(body)},response status code ${statusCode}`;

      if (statusCode < 400) {
        this.myLogger.log(logMessage);
      }
    });
  }
}

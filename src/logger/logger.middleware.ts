import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private myLogger: MyLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.myLogger.setContext(req.baseUrl);
    // this.myLogger.log(`Request ${req.method} ${JSON.stringify(req.body)}`);
    next();
    this.myLogger.log(
      `Request: ${req.method}, query ${JSON.stringify(
        req.query,
      )}, body ${JSON.stringify(req.body)}, response status code ${
        res.statusCode
      }`,
    );
  }
}

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';
import { MyLogger } from './logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private myLogger: MyLogger,
  ) {}
  catch(exception: HttpException, host: ArgumentsHost): void {
    console.log(exception instanceof HttpException);

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const path = httpAdapter.getRequestUrl(req);

    let httpStatus: number;
    let errorContent: string;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      errorContent = exception.message;
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      errorContent = 'Internal Server Error';
    }

    const responseBody = {
      statusCode: httpStatus,
      message: errorContent,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

    const errorMessage = `request ${
      req.method
    }, url ${path}, query ${JSON.stringify(req.query)},  body ${JSON.stringify(
      req.body,
    )}, response status code ${httpStatus}`;

    this.myLogger.error(errorMessage);
  }
}

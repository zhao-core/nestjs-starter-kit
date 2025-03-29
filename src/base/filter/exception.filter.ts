import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception?.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;
    const stack = exception.stack;

    this.logger.error(
      `[${request.method}] ${request.url} ${status} ${message} ${stack}`,
    );

    response.status(status).json({
      Code: -1,
      Message: message,
      Data: null,
      Time: new Date().toISOString(),
      Path: request.url,
    });
  }
}

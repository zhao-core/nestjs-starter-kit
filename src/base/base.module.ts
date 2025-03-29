import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AsyncLocalStorage } from 'async_hooks';
import { ASYNC_STORAGE } from './constants';
import { DataBaseException } from './exception/database.exception';
import { HttpExceptionFilter } from './filter/exception.filter';
import { RequestInterceptor } from './interceptor/request.interceptor';
import { MailService } from './services/mail/mail.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: ASYNC_STORAGE,
      useValue: new AsyncLocalStorage(),
    },
    { provide: APP_INTERCEPTOR, useClass: RequestInterceptor },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    MailService,
    DataBaseException,
    HttpExceptionFilter,
  ],
  exports: [ASYNC_STORAGE, MailService, DataBaseException, HttpExceptionFilter],
})
export class BaseModule {}

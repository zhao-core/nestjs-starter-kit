import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggerInterceptor } from './interceptors/request-logger.interceptor';
import { AppLoggerService } from './services/app-logger/app-logger.service';

@Module({
  imports: [ConfigModule],
  providers: [
    AppLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
  ],
})
export class LoggerModule {}

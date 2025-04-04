import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BaseModule } from './base/base.module';
import { AsyncStorageMiddleware } from './base/middleware/async-storage/async-storage.middleware';
import { AppCacheModule } from './cache/cache.module';
import { getConfig } from './config/configuration';
import { DbModule } from './db/db.module';
import { LoggerModule } from './logger/logger.module';
import { UserModule } from './modules/user/user.module';
import { TasksModule } from './schedule/tasks.module';
// import { CsurfMiddleware } from '@nest-middlewares/csurf';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { ResponseTimeMiddleware } from '@nest-middlewares/response-time';

@Module({
  imports: [
    BaseModule,
    ConfigModule.forRoot({
      cache: true,
      load: [getConfig],
    }),
    DbModule,
    AppCacheModule,
    UserModule,
    ConfigModule,
    LoggerModule,
    ScheduleModule.forRoot(),
    TasksModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AsyncStorageMiddleware).forRoutes('*');
    // CsurfMiddleware.configure({ cookie: true });
    // consumer.apply(CsurfMiddleware).forRoutes('*');
    // HelmetMiddleware.configure( /* options as per helmet docs */ );
    consumer
      .apply(
        AsyncStorageMiddleware,
        CorsMiddleware,
        HelmetMiddleware,
        ResponseTimeMiddleware,
      )
      .forRoutes('*');
  }
}

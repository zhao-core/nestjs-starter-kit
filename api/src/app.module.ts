import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { getConfig } from './services/app-config/configuration';
import { AppCacheModule } from './app-cache/app-cache.module';
import { LoggerModule } from './logger/logger.module';
import { AsyncStorageMiddleware } from './global/middleware/async-storage/async-storage.middleware';
import { GlobalModule } from './global/global.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './schedule/tasks.module';
// import { CsurfMiddleware } from '@nest-middlewares/csurf';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { ResponseTimeMiddleware } from '@nest-middlewares/response-time';

@Module({
  imports: [
    GlobalModule,
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

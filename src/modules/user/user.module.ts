import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppCacheModule } from '../../cache/cache.module';
import { UserEntity } from './entities/user.entity';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './services/auth/strategies/jwt/jwt.strategy';
import { JwtService } from './services/jwt/jwt.service';
import { PasswordService } from './services/password/password.service';
import { UserService } from './services/user/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule,
    AppCacheModule,
  ],
  controllers: [UserController],
  providers: [
    AuthService,
    UserService,
    PasswordService,
    JwtService,
    JwtStrategy,
  ],
})
export class UserModule {}

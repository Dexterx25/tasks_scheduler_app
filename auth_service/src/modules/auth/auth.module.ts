import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTModule } from 'src/configurations/jwt';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/dataAccess/databases';
import { AuthRepository } from 'src/dataAccess/databases/repositories';
import { UserModule } from '../users/users.module';
import { HandleErrorservice } from 'src/configurations/exceptions';
import { AuthRefreshModule } from '../auth_refresh/auth_refresh.module';
import { PasswordModule } from '../passwords/password.module';
import { RedisService } from 'src/configurations/redis/redis.service';

@Module({
  controllers: [AuthController],
  imports: [DatabaseModule, JWTModule, AuthRefreshModule, PasswordModule, UserModule, ConfigModule],
  providers: [
    AuthService, 
    AuthRepository, 
    HandleErrorservice,
    RedisService,
  ],
  exports: [AuthService],

})
export class AuthModule {}
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/dataAccess/databases';
import { AuthRefreshService } from './auth_refresh.service';
import { AuthRefreshRepository } from 'src/dataAccess/databases/repositories/userGroupsRepositories/auth.refresh.repository';
import { RedisService } from 'src/configurations/redis/redis.service';
import { JWTService } from 'src/configurations/jwt';

@Module({
  controllers: [],
  imports: [DatabaseModule, ConfigModule],
  providers: [AuthRefreshRepository, AuthRefreshService, RedisService, JWTService],
  exports: [AuthRefreshService],

})
export class AuthRefreshModule {}
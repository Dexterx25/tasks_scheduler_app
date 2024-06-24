import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from 'src/dataAccess/databases/repositories';
import { DatabaseModule } from 'src/dataAccess/databases';
import { HandleErrorservice } from 'src/configurations/exceptions';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule, ConfigModule],
  providers: [UserRepository, UserService, HandleErrorservice],
  exports: [UserService],

})

export class UserModule {}
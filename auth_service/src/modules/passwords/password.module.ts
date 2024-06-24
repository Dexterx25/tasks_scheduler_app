import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PasswordsRepository } from 'src/dataAccess/databases/repositories/userGroupsRepositories/password.repository';
import { DatabaseModule } from 'src/dataAccess/databases';
import { PasswordService } from './password.service';

@Module({
  controllers: [],
  imports: [DatabaseModule, ConfigModule],
  providers: [PasswordsRepository, PasswordService],
  exports: [PasswordService],

})
export class PasswordModule {}
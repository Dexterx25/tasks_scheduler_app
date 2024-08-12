import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/dataAccess/databases";
import { ImplementationsModules } from "./dataAccess/implementations/implementations.module";
import { ExceptionsModule } from "./configurations/exceptions";

import * as dotenv from 'dotenv';
import { UserModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
dotenv.config();


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ImplementationsModules,
    ExceptionsModule,
  ],
})
export class AppModule {}
 
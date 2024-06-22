import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dbSet } from "src/utils/types";
import {
  Auth, 
  User, 
  Passwords, 
  AuthRefresh, 
  Roles, 
  RolesUsers, 
  Timestamps, 
  TypeDocument, 
  UserDetails} from 'src/dataAccess/databases/postgresql/entities';
export const dataBaseProviderCustom =  TypeOrmModule.forRootAsync({
    imports: [ConfigModule.forRoot({})],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      console.log('configService', configService)
      const dataConnection: any = {
        type: dbSet,
        host: configService.get<string>("HOSTDB"),
        port: configService.get<number>("PORTDB"),
        database: configService.get<string>("NAMEDB"),
        authSource: configService.get<string>("AUTHSOURCEDB"),
        entities: [User, Auth, Passwords, Timestamps, AuthRefresh, Roles, RolesUsers, TypeDocument, UserDetails],
      }
      if(configService.get<string>("USERNAMEDB")) dataConnection.username = configService.get<string>("USERNAMEDB")
      if(configService.get<string>("PASSWORDDB")) dataConnection.password = configService.get<string>("PASSWORDDB")
      console.log('dataConnection-->', dataConnection)
      return dataConnection
    },
  });
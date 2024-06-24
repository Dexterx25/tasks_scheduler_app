import { Injectable } from "@nestjs/common";
import { JWTService } from "src/configurations/jwt";
import { RedisService } from "src/configurations/redis/redis.service";
import { AuthRefresh } from "src/dataAccess/databases/postgresql/entities";
import { AuthRefreshRepository } from "src/dataAccess/databases/repositories/userGroupsRepositories/auth.refresh.repository";

interface IauthRefresh {
  expiration_date: Date;
  user_id: string;
  refresh_token: String;
}
@Injectable()
export class AuthRefreshService {
  constructor(
      private readonly authRefreshRepository: AuthRefreshRepository,
      private readonly redis: RedisService,
      private readonly jwtService: JWTService,
    ) {}
 
  public async createAuthRefresh(data: IauthRefresh): Promise<AuthRefresh> {
    return await this.authRefreshRepository.create(data)
  }
  
  public async getAuthRefreshByUserId(user_id: string): Promise<AuthRefresh> {
    return await this.authRefreshRepository.findOne({where: {user_id}})
  } 
  public async refresh (id: string) {
    await this.redis.deleteSessionValue(id);
    return {
      access: await this.jwtService.createAccess({ id }),
      refresh: await this.jwtService.createRefresh({ id }),
    };
  };
};


import { Injectable } from "@nestjs/common";
import { AuthRepository } from "src/dataAccess/databases/repositories";
import { IUserData, Passwords, User } from "src/dataAccess/databases/postgresql/entities";
import { JWTService } from "src/configurations/jwt";
import { UserService } from "../users/users.service";
import * as bcrypt from 'bcrypt';
import { HandleErrorservice } from "src/configurations/exceptions";
import { EnumErrorCodes } from "src/configurations/exceptions/constants";
import { LoginUserDTO } from "./DTO/input/longin.dto";
import { DataSource } from "typeorm";
import { UserRegisterDTO } from "./DTO";
import { PasswordService } from "../passwords/password.service";
import { AuthRefreshService } from "../auth_refresh/auth_refresh.service";
import { RedisService } from "src/configurations/redis/redis.service";
@Injectable()
export class AuthService {
  constructor(
      private readonly authRepository: AuthRepository,
      private readonly jwtService: JWTService,
      private readonly userService: UserService,
      private readonly handleErrorService: HandleErrorservice,
      private readonly dataSource: DataSource,
      private readonly passwordService: PasswordService,
      private readonly authRefreshService: AuthRefreshService,
      private readonly redis: RedisService,

    ) {}
 
  private async createAuth({
    access_token,
    expiration_date,
    user_id,
  }) {
    return await this.authRepository.create({
      access_token,
      expiration_date,
      user_id,
    })
  }

  private async SignCreateToken(userData: IUserData ): Promise<ResponseSign> {
      return await this.jwtService.signToken(userData)
  }

  async login({email, password}: LoginUserDTO): Promise<ResponseSign> {
    const auth = await this.passwordService.getPasswordByEmail(email) 
    const areEqual =  await bcrypt.compare(password, auth.password!)
    
    if(areEqual !== true) this.handleErrorService.handleError({
      details: ['Forbiden'],
      message: 'User unauthorized',
      statusCode: EnumErrorCodes.FORBIDDEN_ERROR,
    })
    const instanceUser = await this.userService.getUserById(auth.user_id)
    const dataToToken: IUserData = instanceUser;
      const dataSign: ResponseSign = await this.SignCreateToken({
        ...dataToToken, 
      }) 
    return dataSign;
  }
  
  public async register (dataUser: UserRegisterDTO): Promise<ResponseSign> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const instanceUser: User = await this.userService.createUser(dataUser)
      await queryRunner.manager.save(instanceUser)

      const passwordEncrypted: Passwords = await this.passwordService.EncryptAndCreatePassword({
        is_vigent: true,
        password: dataUser.password,
        user_id: instanceUser.user_id,
        salt: '123',
      });
      await queryRunner.manager.save(passwordEncrypted);

      const dataToToken: IUserData = instanceUser;
      const { access_token, refresh_token } = await this.SignCreateToken({
        ...dataToToken, 
      }) 
      const dataAuth = await this.createAuth({
        access_token,
        expiration_date: new Date(),
        user_id: instanceUser.user_id,
      })
      await queryRunner.manager.save(dataAuth);

      const dataAuthRefresh = await this.authRefreshService.createAuthRefresh({
        refresh_token,
        expiration_date: new Date(),
        user_id: instanceUser.user_id,
      })
      await queryRunner.manager.save(dataAuthRefresh);

      await queryRunner.commitTransaction();

      return { access_token, refresh_token }   
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  logout = async (id: string) => {
    await this.redis.deleteSessionValue(id);
  };

};


import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/dataAccess/databases/repositories";
import { UserRegisterDTO } from "./DTO/input/user.dto";
import { Passwords, User } from "src/dataAccess/databases/postgresql/entities";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService
  ) {}
 
  public async createUser(data: UserRegisterDTO): Promise<ResponseCreateUser>{
    const { names, nikname, surnames, email} = data;

    const dataUser: User = await this.userRepository.create({
      names,
      nikname,
      surnames,
      email
    })
    const passwordEncrypted: Passwords = await this.authService.createPassword({
      is_vigent: true,
      password: data.password,
      user_id: dataUser.user_id,
      salt: '123',
    })  
    const { token } = await this.authService.SignCreateToken({
      ...dataUser, 
      password: passwordEncrypted.password
    }) 
    const dataAuth = await this.authService.createAuth({
      access_token: token,
      expiration_date: new Date(),
      user_id: dataUser.user_id,
    })
    return {access_token: dataAuth.access_token}
  };
};


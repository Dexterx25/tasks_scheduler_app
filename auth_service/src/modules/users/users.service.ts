import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/dataAccess/databases/repositories";
import { UserRegisterDTO } from "../auth/DTO/input/user.dto";
import { User } from "src/dataAccess/databases/postgresql/entities";
import { HandleErrorservice } from "src/configurations/exceptions";
import { EnumErrorCodes } from "src/configurations/exceptions/constants";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly handleErrorService: HandleErrorservice
  ) {}
 
  public async createUser(data: UserRegisterDTO): Promise<User>{
      const { names, nikname, surnames, email, type_document_id} = data;
      const dataUser: User = await this.userRepository.create({
        names,
        nikname,
        surnames,
        email,
        type_document_id,
      })
      return dataUser;
  };
  public async getUserByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOne({where: {email}})
    if(!user) throw this.handleErrorService.handleError({
      details: ['User not Found'], 
      message: 'User not Found', 
      statusCode: EnumErrorCodes.NOT_FOUND});

      return user;
  }
  public async getUserById(user_id: string): Promise<User> {
    const user: User = await this.userRepository.findOne({where: {user_id}})
    if(!user) throw this.handleErrorService.handleError({
      details: ['User not Found'], 
      message: 'User not Found', 
      statusCode: EnumErrorCodes.NOT_FOUND});

      return user;
  }
};


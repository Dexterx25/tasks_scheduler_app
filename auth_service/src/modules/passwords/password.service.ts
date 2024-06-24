import { Injectable } from "@nestjs/common";
import { Passwords } from "src/dataAccess/databases/postgresql/entities";
import { EncryptPassword } from "src/utils/encryptors";
import { PasswordsRepository } from "src/dataAccess/databases/repositories/userGroupsRepositories/password.repository";

export interface IPasswords {
  password: string,
  salt: string,
  is_vigent: boolean,
  user_id: any
}

@Injectable()
export class PasswordService {
  constructor(
      private readonly passwordRepository: PasswordsRepository,
    ) {}
 
  public async EncryptAndCreatePassword(data: IPasswords): Promise<Passwords> {
      const passwordEncrypted = EncryptPassword(data.password!)
      const intance = await this.passwordRepository.create({
        ...data,
        password: passwordEncrypted
      })
      return intance 
  }
  
  public async getPasswordByEmail(email: string): Promise<Passwords> {
    return await this.passwordRepository.findOne({where: {email}})
  } 
};


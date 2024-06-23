import { Controller, Post, Body} from '@nestjs/common';
import {  ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './users.service';
import { config } from 'src/configurations/config/envs';
import { UserRegisterDTO } from './DTO/input/user.dto';

@ApiTags("users")
@Controller(`${config.url_selft_api}`)
export class UserController {
  constructor(
    private readonly userService: UserService,
    ) {}
  @Post('users')
  @ApiOperation({
    summary: 'Con este endpoint puede crear un usuario',
    description: 'endpoint para crear usuario en el sistema con el fin de usarlo para todas las necesidades del sistema'
  })
 async createUser(@Body() data: UserRegisterDTO): Promise<ResponseCreateUser> {
    const dataUser: ResponseCreateUser = await this.userService.createUser(data)
    return dataUser   
  };

};

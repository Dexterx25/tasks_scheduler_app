import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { config } from 'src/configurations/config/envs';
import { UserRegisterDTO } from './DTO';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './DTO/input/longin.dto';

@ApiTags("auth")
@Controller(`${config.url_selft_api}`)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}
  @Post('register')
  @ApiOperation({
    summary: 'Con este endpoint puedes registrar cuenta de usuario',
  })
 async register(@Body() data: UserRegisterDTO): Promise<ResponseSign> {
  const dataUser: ResponseSign = await this.authService.register(data)
  return dataUser   
};
 
  @Post('login')
  @ApiOperation({
    summary: 'Con este endpoint se puede logear el usuario registrado',
  })
 async login(
    @Body() data: LoginUserDTO
  ): Promise<ResponseSign> {
     const dataUser: ResponseSign = await this.authService.login(data)
     return dataUser
  };
}; 

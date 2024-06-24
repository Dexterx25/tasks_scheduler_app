import { Controller, Get} from '@nestjs/common';
import {  ApiOperation, ApiTags } from '@nestjs/swagger';
import { config } from 'src/configurations/config/envs';

@ApiTags("users")
@Controller(`${config.url_selft_api}`)
export class UserController {
  constructor(
    ) {}
  @Get('users')
  @ApiOperation({
    summary: 'Endpoint para traer lista de usuarios',
    description: 'con este endpoint traes la lista de usuarios'
  })
 async getUser(){
  console.log('list users')
 }

};

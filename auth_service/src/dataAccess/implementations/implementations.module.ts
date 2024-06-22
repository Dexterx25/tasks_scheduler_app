import { Module } from '@nestjs/common';
import { AxiosDataAccess } from '../recurses/axios';
import { ExceptionsModule } from 'src/configurations/exceptions';

@Module({
  imports: [ExceptionsModule],
  exports: [],
  providers: [AxiosDataAccess],
})
export class ImplementationsModules {}

// userService.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/dataAccess/databases/postgresql/entities';
import { GuardsService } from 'src/configurations/guards/guards.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import * as dotenv from 'dotenv';
import { ENVIRONMENT_MOCK } from '../env.mock';
import { RedisService } from 'src/configurations/redis/redis.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'src/configurations/redis';
import { DatabaseModule } from 'src/dataAccess/databases';
import { UserRepository } from 'src/dataAccess/databases/repositories';

dotenv.config();

describe('UserService', () => {
  let userRepository: UserRepository;
  let guardService: GuardsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GuardsService,
        RedisService,
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, 
        },
        {
            provide: 'ENVIRONMENT',
            useValue: ENVIRONMENT_MOCK,
        },
      ],
      imports:[DatabaseModule, RedisModule, ConfigModule]
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
    //userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
    guardService = moduleRef.get<GuardsService>(GuardsService);
  });

  describe('validatePermissions', () => {
    it('should throw ForbiddenException if user has no permissions', async () => {
      const userId = 'someUserId';
      const functionPermissions = ['module-name'];

      jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]), // Simula que no se encontraron permisos
        setParameter: jest.fn().mockReturnThis(),
      } as unknown as SelectQueryBuilder<User>);

      await expect(guardService.validatePermissions(userId, functionPermissions)).rejects.toThrow(ForbiddenException);
    });

      it('bring_permisions', async () => {
        const userId = 'someUserId';
        const functionPermissions = ['module-name'];
  
        jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue({
          select: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          andWhere: jest.fn().mockReturnThis(),
          leftJoin: jest.fn().mockReturnThis(),
          getRawMany: jest.fn().mockResolvedValue([{ module: 'module', name: 'name' }]),
          setParameter: jest.fn().mockReturnThis(),
        } as unknown as SelectQueryBuilder<User>);
  
        await expect(guardService.validatePermissions(userId, functionPermissions)).rejects.toThrow(ForbiddenException);
      });
    it('should throw ForbiddenException if functionPermissions are invalid', async () => {
      const userId = 'someUserId';
      const functionPermissions = ['module-name'];

      jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([{ module: 'module', name: 'name' }]), // Simula que se encontraron permisos
        setParameter: jest.fn().mockReturnThis(),
      } as unknown as SelectQueryBuilder<User>);

      await expect(guardService.validatePermissions(userId, functionPermissions)).rejects.toThrow(ForbiddenException);
    });

    it('should return true if functionPermissions are valid', async () => {
      const userId = 'someUserId';
      const functionPermissions = ['module-name'];

      jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([{ module: 'module', name: 'name' }]), // Simula que se encontraron permisos
        setParameter: jest.fn().mockReturnThis(),
      } as unknown as SelectQueryBuilder<User>);

      const result = await guardService.validatePermissions(userId, functionPermissions);
      expect(result).toBe(true);
    });
  });
});

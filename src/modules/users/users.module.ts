import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users-repository';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: UsersRepository, useClass: UsersService },
  ],
  exports: [UsersRepository],
})
export class UsersModule {}

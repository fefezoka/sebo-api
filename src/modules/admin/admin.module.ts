import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users-repository';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [
    UsersService,
    { provide: UsersRepository, useClass: UsersService },
    AdminService,
  ],
})
export class AdminModule {}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../users/entities/user.entity';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { AdminService } from './admin.service';
import { UsersRepository } from '../users/users-repository';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly adminService: AdminService,
  ) {}

  @Get('users')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiResponse({ type: UserEntity, isArray: true })
  findMany() {
    return this.usersRepository.findMany();
  }

  @Get('/reports')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  reports() {
    return this.adminService.reports();
  }
}

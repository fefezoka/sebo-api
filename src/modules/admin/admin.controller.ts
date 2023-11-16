import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../users/entities/user.entity';
import { AdminService } from './admin.service';
import { UsersService } from '../users/users.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { ReportEntity } from '../admin/entities/report.entity';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminService: AdminService,
  ) {}

  @Get('users')
  @ApiBearerAuth()
  @HasRoles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findMany() {
    return this.usersService.findMany();
  }

  @Get('/reports')
  @ApiBearerAuth()
  @HasRoles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: ReportEntity })
  reports() {
    return this.adminService.reports();
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../users/entities/user.entity';
import { AdminService } from './admin.service';
import { UsersService } from 'src/modules/users/users.service';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { HasRoles } from 'src/modules/auth/decorators/roles.decorator';
import { ReportEntity } from 'src/modules/admin/entities/report.entity';

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

import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Put,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dtos/update-user.dto';
import { DeleteUserDto } from './dtos/delete-user.dto';
import { UsersService } from './users.service';
import { UserFromJwt } from '../auth/models/UserFromJwt';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IsPublic } from 'src/modules/auth/decorators/is-public.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async me(@CurrentUser() currentUser: UserFromJwt) {
    return await this.usersService.findById(currentUser.id);
  }

  @Post()
  @IsPublic()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Put()
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @ApiForbiddenResponse({ description: '' })
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: UserFromJwt,
  ): Promise<UserEntity> {
    if (updateUserDto.role === 'ADMIN' && currentUser.role !== 'ADMIN') {
      throw new UnauthorizedException();
    }

    return await this.usersService.update(updateUserDto, currentUser.id);
  }

  @Delete()
  @ApiBearerAuth()
  async delete(
    @Query() DeleteUserDto: DeleteUserDto,
    @CurrentUser() user: UserFromJwt,
  ): Promise<void> {
    return await this.usersService.delete(DeleteUserDto, user.id);
  }
}

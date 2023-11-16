import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { DeleteUserDto } from './dtos/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const emailAlreadyExist = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (!!emailAlreadyExist) {
      throw new ConflictException({
        ...(!!emailAlreadyExist && {
          email: {
            description: 'Email indisponível',
            code: 'email_not_available',
          },
        }),
      });
    }

    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    return await this.prisma.user.create({ data });
  }

  async findMany(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) {
      return user;
    }

    throw new NotFoundException();
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (user) {
      return user;
    }

    throw new NotFoundException();
  }

  async update(UpdateUserDto: UpdateUserDto, id: string): Promise<UserEntity> {
    const data: Prisma.UserUpdateInput = {
      ...UpdateUserDto,
      password: UpdateUserDto.password
        ? await bcrypt.hash(UpdateUserDto.password, 10)
        : undefined,
    };

    return await this.prisma.user.update({ data, where: { id } });
  }

  async delete(DeleteUserDto: DeleteUserDto, id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    const validPassword = await bcrypt.compare(
      DeleteUserDto.currentPassword,
      user.password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('A senha antiga está incorreta');
    }

    await this.prisma.user.update({
      where: { id },
      data: {
        status: 'NOTACTIVE',
      },
    });
  }

  async updatePassword(
    UpdatePasswordDto: UpdatePasswordDto,
    id: string,
  ): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    const validPassword = await bcrypt.compare(
      UpdatePasswordDto.currentPassword,
      user.password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('A senha antiga está incorreta');
    }

    const password = await bcrypt.hash(UpdatePasswordDto.newPassword, 10);

    await this.prisma.user.update({ data: { password }, where: { id } });
  }
}

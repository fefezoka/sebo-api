import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { UserFromJwt } from './models/UserFromJwt';
import { UserEntity } from '../users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(user: UserFromJwt): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    login: string,
    password: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.usersService.findByEmail(login);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (user.status === 'NOTACTIVE') {
        this.usersService.update({ status: 'ACTIVE' }, user.id);
      }

      const { password: noPassword, ...rest } = user;

      if (isPasswordValid) {
        return {
          ...rest,
        };
      }
    }

    throw new UnauthorizedException('Email ou senha incorretos');
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { UserFromJwt } from './models/UserFromJwt';
import { UserEntity } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users-repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async login(user: UserFromJwt): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    login: string,
    password: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.usersRepository.findByEmail(login);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (user.status === 'NOTACTIVE') {
        throw new UnauthorizedError('Usuário desativado');
      }

      const { password: noPassword, ...rest } = user;

      if (isPasswordValid) {
        return {
          ...rest,
        };
      }
    }

    throw new UnauthorizedError('Email ou senha incorretos');
  }
}

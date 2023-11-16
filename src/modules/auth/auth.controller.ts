import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserToken } from './models/UserToken';
import { LoginRequestBody } from './models/LoginRequestBody';
import { IsPublic } from 'src/modules/auth/decorators/is-public.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: UserToken })
  @ApiBody({ type: LoginRequestBody })
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}

import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AdminModule,
    PrismaModule,
    ConfigModule.forRoot(),
  ],
  providers: [AuthService, JwtService],
})
export class AppModule {}

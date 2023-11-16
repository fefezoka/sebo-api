import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { ItemsModule } from '../items/items.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, ItemsModule, UsersModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}

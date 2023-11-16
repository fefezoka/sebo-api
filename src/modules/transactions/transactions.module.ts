import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemsModule } from 'src/modules/items/items.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [PrismaModule, ItemsModule, UsersModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}

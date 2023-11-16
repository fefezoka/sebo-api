import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';

@Module({
  imports: [PrismaModule, CategoriesModule],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}

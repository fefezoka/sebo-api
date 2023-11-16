import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from 'src/modules/categories/entities/category.entity';
import { ItemEntity } from 'src/modules/items/entities/item.entity';
import { TransactionEntity } from 'src/modules/transactions/entities/transaction.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

class ActiveUsers {
  @ApiProperty()
  count: number;
}

class NotActiveUsers {
  @ApiProperty()
  count: number;
}

class UsersData {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: UserEntity, isArray: true })
  data: UserEntity;
}

class Users {
  @ApiProperty()
  active: ActiveUsers;

  @ApiProperty()
  notActive: NotActiveUsers;

  @ApiProperty()
  count: number;

  @ApiProperty()
  admin: UsersData;

  @ApiProperty()
  buyers: UsersData;

  @ApiProperty()
  sellers: UsersData;
}

class Categories {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: CategoryEntity, isArray: true })
  data: CategoryEntity;
}

class Items {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: ItemEntity, isArray: true })
  data: ItemEntity;
}

class Transactions {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: TransactionEntity, isArray: true })
  data: TransactionEntity;

  @ApiProperty()
  totalPrice: number;
}

export class ReportEntity {
  @ApiProperty()
  users: Users;

  @ApiProperty()
  categories: Categories;

  @ApiProperty()
  items: Items;

  @ApiProperty()
  transactions: Transactions;
}

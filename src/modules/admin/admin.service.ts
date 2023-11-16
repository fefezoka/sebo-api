import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async reports() {
    const users = await this.prisma.user.findMany();
    const categories = await this.prisma.category.findMany();
    const items = await this.prisma.item.findMany();
    const transactions = await this.prisma.transaction.findMany();

    const active = users.filter((user) => user.status === 'ACTIVE');
    const notActive = users.filter((user) => user.status === 'NOTACTIVE');
    const admins = users.filter((user) => user.role === 'ADMIN');
    const buyers = users.filter((user) => user.role === 'BUYER');
    const sellers = users.filter((user) => user.role === 'SELLER');

    return {
      users: {
        active: {
          count: active.length,
        },
        notActive: {
          count: notActive.length,
        },
        count: users.length,
        admins: {
          count: admins.length,
          data: admins,
        },
        buyers: {
          count: buyers.length,
          data: buyers,
        },
        sellers: {
          count: sellers.length,
          data: sellers,
        },
      },
      categories: {
        count: categories.length,
        data: categories,
      },
      items: {
        count: items.length,
        data: items,
      },
      transactions: {
        count: transactions.length,
        data: transactions,
        totalPrice: transactions.reduce((acc, curr) => acc + curr.price, 0),
      },
    };
  }
}

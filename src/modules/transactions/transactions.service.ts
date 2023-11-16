import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionEntity } from 'src/modules/transactions/entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionEntity> {
    return this.prisma.transaction.create({
      data: {
        ...createTransactionDto,
        itemId: undefined as never,
        sellerId: undefined as never,
        buyerId: undefined as never,
        item: {
          connect: {
            id: createTransactionDto.itemId,
          },
        },
        seller: {
          connect: {
            id: createTransactionDto.sellerId,
          },
        },
        buyer: {
          connect: {
            id: createTransactionDto.buyerId,
          },
        },
      },
      include: {
        buyer: true,
        item: {
          include: {
            category: true,
          },
        },
        seller: true,
      },
    });
  }

  byUser(userId: string): Promise<TransactionEntity[]> {
    return this.prisma.transaction.findMany({
      where: {
        OR: [
          {
            buyerId: userId,
          },
          {
            sellerId: userId,
          },
        ],
      },
      include: {
        buyer: true,
        item: {
          include: {
            category: true,
          },
        },
        seller: true,
      },
    });
  }
}

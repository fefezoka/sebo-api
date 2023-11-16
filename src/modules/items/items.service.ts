import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserFromJwt } from 'src/modules/auth/models/UserFromJwt';
import { SearchItemDto } from 'src/modules/items/dto/search-item.dto';
import { ItemEntity } from 'src/modules/items/entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    createItemDto: CreateItemDto,
    currentUser: UserFromJwt,
  ): Promise<ItemEntity> {
    return this.prisma.item.create({
      data: {
        ...createItemDto,
        category: {
          connect: {
            name: createItemDto.category,
          },
        },
        status: 'ACTIVE',
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        category: true,
      },
    });
  }

  findMany(): Promise<ItemEntity[]> {
    return this.prisma.item.findMany({
      include: {
        category: true,
      },
    });
  }

  async findUnique(id: string): Promise<ItemEntity> {
    const item = await this.prisma.item.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });

    if (item) {
      return item;
    }

    throw new NotFoundException();
  }

  search(query: SearchItemDto): Promise<ItemEntity[]> {
    return this.prisma.item.findMany({
      where: {
        OR: [
          {
            author: {
              contains: query.author,
              mode: 'insensitive',
            },
          },
          {
            isbn: {
              equals: query.isbn,
              mode: 'insensitive',
            },
          },
          {
            title: {
              contains: query.title,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        category: true,
      },
    });
  }

  update(updateItemDto: UpdateItemDto, id: string): Promise<ItemEntity> {
    const { category, ...rest } = updateItemDto;

    return this.prisma.item.update({
      data: {
        ...rest,
        ...(category && {
          category: {
            connect: { name: updateItemDto.category },
          },
        }),
      },
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
  }

  remove(id: string): Promise<ItemEntity> {
    return this.prisma.item.update({
      data: {
        status: 'NOTACTIVE',
      },
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
  }
}

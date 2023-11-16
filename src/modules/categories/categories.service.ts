import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryEntity } from 'src/modules/categories/entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
      },
    });
  }

  findMany(): Promise<CategoryEntity[]> {
    return this.prisma.category.findMany();
  }

  update(
    updateCategoryDto: UpdateCategoryDto,
    id: string,
  ): Promise<CategoryEntity> {
    return this.prisma.category.update({
      data: updateCategoryDto,
      where: {
        id,
      },
    });
  }

  async findByName(name: string): Promise<CategoryEntity> {
    const category = await this.prisma.category.findUnique({
      where: {
        name,
      },
    });

    if (category) {
      return category;
    }

    throw new NotFoundException();
  }

  async delete(id: string): Promise<CategoryEntity> {
    await this.prisma.item.updateMany({
      data: {
        status: 'NOTACTIVE',
      },
      where: {
        categoryId: id,
      },
    });

    return this.prisma.category.update({
      data: {
        status: 'NOTACTIVE',
      },
      where: {
        id,
      },
    });
  }
}

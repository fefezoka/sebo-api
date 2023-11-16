import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserFromJwt } from '../auth/models/UserFromJwt';
import { ItemEntity } from '../items/entities/item.entity';
import { SearchItemDto } from '../items/dto/search-item.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { CategoriesService } from '../categories/categories.service';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ItemEntity })
  @ApiForbiddenResponse({ description: 'A categoria está inativa' })
  async create(
    @Body() createItemDto: CreateItemDto,
    @CurrentUser() currentUser: UserFromJwt,
  ): Promise<ItemEntity> {
    const category = await this.categoriesService.findByName(
      createItemDto.category,
    );

    if (category.status === 'NOTACTIVE') {
      throw new ForbiddenException('A categoria está inativa');
    }

    return this.itemsService.create(createItemDto, currentUser);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: ItemEntity, isArray: true })
  findAll(): Promise<ItemEntity[]> {
    return this.itemsService.findMany();
  }

  @Get('/search')
  @ApiBearerAuth()
  @ApiOkResponse({ type: ItemEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Não foram encontrados items' })
  @ApiBadRequestResponse({ description: 'Parâmetros de entrada inválidos' })
  async search(@Query() query: SearchItemDto): Promise<ItemEntity[]> {
    if (!Object.values(query).length) {
      throw new BadRequestException();
    }

    const items = await this.itemsService.search(query);

    if (items.length) {
      return items;
    }

    throw new NotFoundException();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: ItemEntity })
  @ApiNotFoundResponse({ description: 'Item não encontrado' })
  findOne(@Param('id') id: string): Promise<ItemEntity> {
    return this.itemsService.findUnique(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @HasRoles('ADMIN')
  @ApiOkResponse({ type: ItemEntity })
  update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<ItemEntity> {
    return this.itemsService.update(updateItemDto, id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @HasRoles('ADMIN')
  @ApiOkResponse({ type: ItemEntity })
  remove(@Param('id') id: string): Promise<ItemEntity> {
    return this.itemsService.remove(id);
  }
}

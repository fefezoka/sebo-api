import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ItemsService } from 'src/modules/items/items.service';
import { TransactionEntity } from 'src/modules/transactions/entities/transaction.entity';
import { UsersService } from 'src/modules/users/users.service';
import { TransactionsByUserDto } from 'src/modules/transactions/dto/transactions-by-user.dto';

@Controller('transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly itemsService: ItemsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiOperation({
    description: `Use o seguinte objeto para facilitar o teste da rota:
    \nSerá criado uma transação do livro "A divina comédia", do vendedor de email "vendedor@gmail.com" com o comprador de email "felipebrito2077@gmail.com"
    \n<b>Apenas compradores podem comprar, assim como apenas vendedores podem vender.</b>
    \n
    {
      "itemId": "65557e934f8d6f1e0717a96c",
      "buyerId": "65556b3bdf18a3677a682b2b",
      "sellerId": "65557d8e958029628ba633e2",
      "price": 144.4
    }
    `,
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TransactionEntity })
  @ApiForbiddenResponse({ description: 'O item está inativo ou indisponível' })
  @ApiUnauthorizedResponse({
    description:
      'O comprador ou vendedor não tem o cargo correto para efetuar a transação',
  })
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionEntity> {
    const item = await this.itemsService.findUnique(
      createTransactionDto.itemId,
    );

    const buyer = await this.usersService.findById(
      createTransactionDto.buyerId,
    );

    if (buyer.role !== 'BUYER') {
      throw new UnauthorizedException('O comprador deve ter o cargo BUYER');
    }

    const seller = await this.usersService.findById(
      createTransactionDto.sellerId,
    );

    if (seller.role !== 'SELLER') {
      throw new UnauthorizedException('O vendedor deve ter o cargo SELLER');
    }

    if (item.status === 'NOTACTIVE' || item.status === 'NOTAVAILABLE') {
      throw new ForbiddenException('O item está inativo ou indisponível');
    }

    return this.transactionsService.create(createTransactionDto);
  }

  @Get(':userId')
  @ApiBearerAuth()
  @ApiOkResponse({
    isArray: true,
    type: TransactionEntity,
  })
  @ApiNotFoundResponse({ description: 'Transação não encontrada' })
  transactionsByUser(
    @Param() transactionsByUserDto: TransactionsByUserDto,
  ): Promise<TransactionEntity[]> {
    return this.transactionsService.byUser(transactionsByUserDto.userId);
  }
}

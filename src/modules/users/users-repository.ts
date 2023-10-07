import { CreateUserDto } from './dtos/create-user.dto';
import { DeleteUserDto } from './dtos/delete-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './entities/user.entity';

export abstract class UsersRepository {
  abstract create(createUserDto: CreateUserDto): Promise<void>;
  abstract findMany(): Promise<UserEntity[]>;
  abstract findByEmail(email: string): Promise<UserEntity>;
  abstract findById(id: string): Promise<UserEntity>;
  abstract update(UpdateUserDto: UpdateUserDto, id: string): Promise<void>;
  abstract updatePassword(
    UpdatePasswordDto: UpdatePasswordDto,
    id: string,
  ): Promise<void>;
  abstract delete(DeleteUserDto: DeleteUserDto, id: string): Promise<void>;
}

import { IUser, UpdateUserDTO } from './dto/user.dto';
import { User } from './user.entity';

export class UserMapper {
  static toDatabaseUpdate(user: User, dto: UpdateUserDTO): Partial<IUser> {
    const data: Partial<IUser> = {};

    if (dto.name) data.name = user.name;
    if (dto.email) data.email = user.email.value;

    return data;
  }

  static toDatabase(user: User): IUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email.value,
      password: user.password.hashed,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toResponse(user: IUser) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

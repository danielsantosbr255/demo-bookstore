import { IUser, UpdateUserDTO } from './dto/user.dto';
import { User } from './user.entity';

export class UserMapper {
  static toDatabaseUpdate(user: User, dto: UpdateUserDTO): UpdateUserDTO {
    return {
      ...(dto.name && { name: user.name }),
      ...(dto.email && { email: user.email }),
    };
  }

  static toDatabase(user: User): IUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
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

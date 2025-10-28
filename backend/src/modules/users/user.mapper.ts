import { IUser, UpdateUserDTO } from './user.dto';
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
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  static toResponse(user: IUser) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}

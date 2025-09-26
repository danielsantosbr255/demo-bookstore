import { CreateUserDTO } from '../dto/user.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  static toEntity(data: CreateUserDTO, id: string): User {
    return User.create(id, data.name, data.email, data.password);
  }

  static toDTO(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

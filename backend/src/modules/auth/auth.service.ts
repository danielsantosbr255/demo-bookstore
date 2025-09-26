import { CustomError } from '@/common/utils/CustomError';
import { v7 as uuidv7 } from 'uuid';
import { CreateUserDTO } from '../users/dto/user.dto';
import { UserMapper } from '../users/mappers/user.mapper';
import UserRepository from '../users/users.repository';
import { SignInDTO, SignOutDTO } from './dto/auth.dto';

export class AuthService {
  constructor(private readonly repository: UserRepository) {}

  async signUp(data: CreateUserDTO) {
    const userExists = await this.repository.findByEmail(data.email);
    if (userExists) throw new CustomError('User already exists!', 409);

    // TODO: Hash password | Argon2?
    const userEntity = UserMapper.toEntity(data, uuidv7());
    const user = await this.repository.create(userEntity);

    return UserMapper.toDTO(user);
  }

  async signIn(data: SignInDTO) {
    const user = await this.repository.findByEmail(data.email);

    if (!user || user.password !== data.password) {
      throw new CustomError('Invalid credentials!', 401);
    }

    return UserMapper.toDTO(user);
  }

  signOut(data: SignOutDTO) {
    return { id: data.id, message: 'User logged out successfuly!' };
  }
}

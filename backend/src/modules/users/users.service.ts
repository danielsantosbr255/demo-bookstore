import { CustomError } from '@/common/utils/CustomError.js';
import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from './dto/user.dto.js';
import { User } from './entities/user.entity.js';
import { UserMapper } from './mappers/user.mapper.js';
import UserRepository from './users.repository.js';

export default class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async create(data: CreateUserDTO): Promise<UserResponseDTO> {
    const userExists = await this.repository.findByEmail(data.email);
    if (userExists) throw new CustomError('User already exists!', 409);

    const userEntity = User.create(data);
    const user = await this.repository.create(UserMapper.toDatabase(userEntity));

    return UserMapper.toDTO(user);
  }

  async getMany(): Promise<UserResponseDTO[]> {
    const users = await this.repository.findMany();
    return users.map(user => UserMapper.toDTO(user));
  }

  async getOne(id: string): Promise<UserResponseDTO | null> {
    const user = await this.repository.findById(id);
    return user ? UserMapper.toDTO(user) : null;
  }

  async getByEmail(email: string): Promise<UserResponseDTO | null> {
    const user = await this.repository.findByEmail(email);
    return user ? UserMapper.toDTO(user) : null;
  }

  async update(id: string, data: UpdateUserDTO): Promise<UserResponseDTO> {
    const userExists = await this.repository.findById(id);
    if (!userExists) throw new CustomError('User not found!', 404);

    if (data.email && data.email !== userExists.email) {
      const userExists = await this.repository.findByEmail(data.email);
      if (userExists) throw new CustomError('User already exists!', 409);
    }

    const userEntity = User.create(userExists);

    if (data.name) userEntity.updateName(data.name);
    if (data.email) userEntity.updateEmail(data.email);

    const user = await this.repository.update(id, UserMapper.toDatabase(userEntity));

    return UserMapper.toDTO(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.repository.findById(id);
    if (!user) throw new CustomError('User not found!', 404);

    this.repository.delete(id);
  }
}

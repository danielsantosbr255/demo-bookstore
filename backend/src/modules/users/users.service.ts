import { CustomError } from '@/common/utils/CustomError.js';
import logger from '@/common/utils/logger.js';
import { v7 as uuidv7 } from 'uuid';
import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from './dto/user.dto.js';
import { UserMapper } from './mappers/user.mapper.js';
import UserRepository from './users.repository.js';

export default class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async create(data: CreateUserDTO): Promise<UserResponseDTO> {
    const userExists = await this.repository.findByEmail(data.email);
    if (userExists) throw new CustomError('User already exists!', 422);

    const userEntity = UserMapper.toEntity(data, uuidv7());
    const user = await this.repository.create(userEntity);

    logger.info('✅ User created!', user);

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
      if (userExists) throw new CustomError('User already exists!', 422);
    }

    if (data.name) userExists.updateName(data.name);
    if (data.email) userExists.updateEmail(data.email);

    const user = await this.repository.update(id, userExists);

    return UserMapper.toDTO(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.repository.findById(id);
    if (!user) throw new CustomError('User not found!', 404);

    this.repository.delete(id);
  }
}

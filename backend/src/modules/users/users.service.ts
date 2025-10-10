import { PaginationMetadata, PaginationQueryParams } from '@/@types/pagination.js';
import { IDatabase } from '@/common/database/IDatabase.js';
import { CustomError } from '@/common/utils/CustomError.js';
import { createPaginationMetadata, parsePaginationParams } from '@/common/utils/pagination.util.js';
import { CreateUserDTO, IUser, UpdateUserDTO, UserResponseDTO } from './dto/user.dto.js';
import { User } from './user.entity.js';
import { UserMapper } from './user.mapper.js';

type query = PaginationQueryParams & {
  name?: string;
  email?: string;
};

export default class UsersService {
  private readonly table = 'users';
  constructor(private readonly db: IDatabase) {}

  async create(data: CreateUserDTO): Promise<UserResponseDTO> {
    const userExists = await this.db.table<IUser>(this.table).findUnique({
      where: { email: data.email },
    });

    if (userExists) throw new CustomError('User already exists!', 409);
    const userEntity = await User.create(data);

    const user = await this.db.table<IUser>(this.table).create({
      data: UserMapper.toDatabase(userEntity),
      omit: ['password'],
    });

    return user;
  }

  async getMany(query: query): Promise<{ data: UserResponseDTO[]; metadata: PaginationMetadata }> {
    const where: Record<string, string> = {};
    const { page, pageSize, offset } = parsePaginationParams(query);

    if (query.name) where.name = query.name;
    if (query.email) where.email = query.email;

    const users = await this.db.table<IUser>(this.table).findMany({
      where,
      limit: pageSize,
      offset,
      omit: ['password'],
    });

    const totalItems = await this.db.table<IUser>(this.table).count({ where });
    const metadata = createPaginationMetadata({ page, pageSize, totalItems });

    return { data: users, metadata };
  }

  async getById(id: string): Promise<UpdateUserDTO | null> {
    const user = await this.db.table<IUser>(this.table).findUnique({
      where: { id },
      omit: ['password'],
    });
    return user ? UserMapper.toResponse(user) : null;
  }

  async getByEmail(email: string): Promise<IUser | null> {
    const user = await this.db.table<IUser>(this.table).findUnique({ where: { email } });
    return user;
  }

  async update(id: string, data: UpdateUserDTO): Promise<UserResponseDTO> {
    const userExists = await this.db.table<IUser>(this.table).findUnique({ where: { id } });
    if (!userExists) throw new CustomError('User not found!', 404);

    if (data.email && data.email !== userExists.email) {
      const userExists = await this.db.table<IUser>(this.table).findUnique({ where: { email: data.email } });
      if (userExists) throw new CustomError('User already exists!', 409);
    }

    const userEntity = await User.create(userExists);

    if (data.name) userEntity.updateName(data.name);
    if (data.email) userEntity.updateEmail(data.email);

    const user = await this.db.table<IUser>(this.table).update({
      where: { id },
      data: UserMapper.toDatabaseUpdate(userEntity, data),
      omit: ['password'],
    });

    return UserMapper.toResponse(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.db.table<IUser>(this.table).findUnique({ where: { id }, select: ['id'] });
    if (!user) throw new CustomError('User not found!', 404);

    this.db.table<IUser>(this.table).delete({ where: { id } });
  }
}

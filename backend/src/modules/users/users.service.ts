import { PaginationMetadata, PaginationQueryParams } from '@/@types/pagination.js';
import { IDatabase } from '@/common/database/IDatabase.js';
import { createPaginationMetadata, parsePaginationParams } from '@/common/utils/pagination.util.js';
import { Email } from '@/common/value-objects/email.vo.js';
import { HttpError } from '@/core/errors/HttpError.js';
import { CreateUserDTO, IUser, UpdateUserDTO, UserResponseDTO } from './user.dto.js';
import { User } from './user.entity.js';
import { UserMapper } from './user.mapper.js';

type query = PaginationQueryParams & {
  name?: string;
  email?: string;
};

type GetManyResponse = {
  users: UserResponseDTO[];
  metadata: PaginationMetadata;
};

export default class UsersService {
  private readonly table = 'users';

  constructor(private readonly db: IDatabase) {}

  async create(data: CreateUserDTO): Promise<UserResponseDTO> {
    const userEntity = await User.create(data);

    const userExists = await this.db.table<IUser>(this.table).findUnique({
      where: { email: userEntity.email },
    });

    if (userExists) throw HttpError.Conflict('User already exists!');

    const user = await this.db.table<IUser>(this.table).create({
      data: UserMapper.toDatabase(userEntity),
      omit: ['password'],
    });

    return UserMapper.toResponse(user);
  }

  async getMany(query: query): Promise<GetManyResponse> {
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

    return { users, metadata };
  }

  async getById(id: string): Promise<UpdateUserDTO | null> {
    const user = await this.db.table<IUser>(this.table).findUnique({
      where: { id },
      omit: ['password'],
    });
    return user ? UserMapper.toResponse(user) : null;
  }

  async getByEmail(email: string): Promise<IUser | null> {
    if (!Email.isValid(email)) throw HttpError.BadRequest('Invalid email!');

    const user = await this.db.table<IUser>(this.table).findUnique({ where: { email } });
    return user;
  }

  async update(id: string, data: UpdateUserDTO): Promise<UserResponseDTO> {
    const userExists = await this.db.table<IUser>(this.table).findUnique({ where: { id } });
    if (!userExists) throw HttpError.NotFound('User not found!');

    if (data.email && data.email !== userExists.email) {
      if (!Email.isValid(data.email)) throw HttpError.BadRequest('Invalid email!');

      const emailExists = await this.db.table<IUser>(this.table).findUnique({ where: { email: data.email } });
      if (emailExists) throw HttpError.Conflict('Email already registered!');
    }

    const userEntity = User.restore(userExists);

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
    const user = await this.db.table<IUser>(this.table).findUnique({
      where: { id },
      select: ['id'],
    });

    if (!user) throw HttpError.NotFound('User not found!');
    this.db.table<IUser>(this.table).delete({ where: { id } });
  }
}

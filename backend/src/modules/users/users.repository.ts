import IDatabase from '@/config/database/IDatabase';
import { User, UserSchema } from './DTO/User';

interface UserRepository {
  create(data: User): Promise<User>;
  findMany(): Promise<User[]>;
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(id: number, data: User): Promise<User>;
  delete(id: number): Promise<void>;
}

export default class UserModel implements UserRepository {
  constructor(readonly database: IDatabase<User>) {
    this.database.model = 'users';
    this.database.schema = UserSchema;
  }

  async create(data: User): Promise<User> {
    return await this.database.create({ data });
  }

  async findMany(): Promise<User[]> {
    return await this.database.findMany();
  }

  async findById(id: number): Promise<User> {
    return await this.database.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.database.findUnique({ where: { email } });
  }

  async update(id: number, data: User): Promise<User> {
    return await this.database.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.database.delete({ where: { id } });
  }
}

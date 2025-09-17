import { IDatabase } from '@/config/database/IDatabase';
import { UserProps } from './dto/User';
import { IUserRepository } from './users.repository.interface';

export default class UserRepository implements IUserRepository {
  private table = 'users';

  constructor(private readonly database: IDatabase) {}

  async create(data: Omit<UserProps, 'id'>) {
    return await this.database.table<UserProps>(this.table).create({ data });
  }

  async findMany(): Promise<UserProps[]> {
    return await this.database.table<UserProps>(this.table).findMany();
  }

  async findById(id: number) {
    return await this.database.table<UserProps>(this.table).findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.database.table<UserProps>(this.table).findUnique({ where: { email } });
  }

  async update(id: number, data: Partial<UserProps>) {
    return await this.database.table<UserProps>(this.table).update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.database.table<UserProps>(this.table).delete({ where: { id } });
  }
}

import { IDatabase } from '@/config/database/IDatabase';
import { User } from './dto/User';
import { UserRepository } from './users.interface';

export default class UserModel implements UserRepository {
  private table = 'users';

  constructor(private readonly database: IDatabase) {}

  async create(data: User) {
    // this.database(this.table).create({ data });
    return await this.database.table<User>(this.table).create({ data });
  }

  async findMany(): Promise<User[]> {
    return await this.database.table<User>(this.table).findMany();
  }

  async findById(id: number) {
    return await this.database.table<User>(this.table).findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.database.table<User>(this.table).findUnique({ where: { email } });
  }

  async update(id: number, data: User) {
    return await this.database.table<User>(this.table).update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.database.table<User>(this.table).delete({ where: { id } });
  }
}

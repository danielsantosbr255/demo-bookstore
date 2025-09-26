import { IDatabase } from '@/config/database/IDatabase';
import { User } from './entities/user.entity';
import { IUserRepository } from './interfaces/IUsersRepository';

export default class UserRepository implements IUserRepository {
  private table = 'users';

  constructor(private readonly database: IDatabase) {}

  create(data: User) {
    return this.database.table<User>(this.table).create({ data });
  }

  findMany(): Promise<User[]> {
    return this.database.table<User>(this.table).findMany();
  }

  findById(id: string) {
    return this.database.table<User>(this.table).findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.database.table<User>(this.table).findUnique({ where: { email } });
  }

  update(id: string, data: User) {
    return this.database.table<User>(this.table).update({ where: { id }, data });
  }

  delete(id: string) {
    return this.database.table<User>(this.table).delete({ where: { id } });
  }
}

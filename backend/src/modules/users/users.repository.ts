import { IDatabase } from '@/config/database/IDatabase';
import { IUser } from './dto/user.dto';
import { IUserRepository } from './interfaces/IUsersRepository';

export default class UserRepository implements IUserRepository {
  public table = 'users';

  constructor(private readonly database: IDatabase) {}

  create(data: IUser) {
    return this.database.table<IUser>(this.table).create({ data });
  }

  findMany(): Promise<IUser[]> {
    return this.database.table<IUser>(this.table).findMany();
  }

  findById(id: string) {
    return this.database.table<IUser>(this.table).findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.database.table<IUser>(this.table).findUnique({ where: { email } });
  }

  update(id: string, data: IUser) {
    return this.database.table<IUser>(this.table).update({ where: { id }, data });
  }

  delete(id: string) {
    return this.database.table<IUser>(this.table).delete({ where: { id } });
  }
}

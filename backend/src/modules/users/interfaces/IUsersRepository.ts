import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(data: User): Promise<User>;
  findMany(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, data: User): Promise<User>;
  delete(id: string): Promise<User>;
}

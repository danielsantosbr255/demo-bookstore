import { User } from './dto/User';

export interface IUserRepository {
  create(data: User): Promise<User>;
  findMany(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: number, data: User): Promise<User>;
  delete(id: number): Promise<User>;
}

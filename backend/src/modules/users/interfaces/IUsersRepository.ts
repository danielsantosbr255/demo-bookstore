import { IUser } from '../dto/user.dto';

export interface IUserRepository {
  create(data: IUser): Promise<IUser>;
  findMany(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  update(id: string, data: IUser): Promise<IUser>;
  delete(id: string): Promise<IUser>;
  table: string;
}

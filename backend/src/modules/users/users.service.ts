import { User } from './dto/User.js';
import UserRepository from './users.repository.js';

export default class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async create(data: User) {
    const userExists = await this.repository.findByEmail(data.email);
    if (userExists) throw new Error('User already exists!');

    return this.repository.create(data);
  }

  async getMany() {
    return this.repository.findMany();
  }

  async getOne(id: number) {
    return this.repository.findById(id);
  }

  async getByEmail(email: string) {
    return this.repository.findByEmail(email);
  }

  async update(id: number, data: User) {
    const user = await this.repository.findById(id);
    if (!user) throw new Error('User not found!');

    return this.repository.update(id, data);
  }

  async delete(id: number) {
    const user = await this.repository.findById(id);
    if (!user) throw new Error('User not found!');

    return this.repository.delete(id);
  }
}

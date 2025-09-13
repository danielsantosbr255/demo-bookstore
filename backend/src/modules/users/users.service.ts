import { User } from './DTO/User.js';
import UserRepository from './users.repository.js';

export default class UsersService {
  constructor(readonly repository: UserRepository) {}

  async create(data: User) {
    const user = new User(data.name, data.email, data.password);
    return this.repository.create(user);
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
    return this.repository.update(id, data);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}

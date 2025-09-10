import UsersRepository from './users.repository.js';

export default class UsersService {
  /** * @param {UsersRepository} repository */
  constructor(repository) {
    this.repository = repository;
  }

  async create(data) {
    return this.repository.create(data);
  }

  async getMany() {
    return this.repository.findMany();
  }

  async getOne(id) {
    return this.repository.findById(id);
  }

  async getByEmail(email) {
    return this.repository.findByEmail(email);
  }

  async update(id, data) {
    return this.repository.update(id, data);
  }

  async delete(id) {
    return this.repository.delete(id);
  }
}

import User from "../../common/models/User.js";

export default class UsersRepository {
  async create(data) {
    return User.create(data);
  }

  async findMany() {
    return User.findMany();
  }

  async findById(id) {
    return User.findUnique({ where: { id } });
  }

  async findByEmail(email) {
    return User.findUnique({ where: { email } });
  }

  async update(id, data) {
    return User.update({ where: { id }, data });
  }

  async delete(id) {
    return User.delete({ where: { id } });
  }
}

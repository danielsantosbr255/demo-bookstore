import Product from "../../common/models/Product.js";

export default class ProductRepository {
  /** @param {Product} model */
  constructor() {
    this.model = Product;
  }

  async create(data) {
    return this.model.create({ data });
  }

  async getMany(where) {
    return this.model.findMany(where);
  }

  async getOne(id) {
    return this.model.findUnique({ where: { id } });
  }

  async update(id, data) {
    return this.model.update({ where: { id }, data });
  }

  async delete(id) {
    return this.model.delete({ where: { id } });
  }
}

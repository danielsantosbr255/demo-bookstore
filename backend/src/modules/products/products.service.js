import ProductRepository from "./products.repository.js";

export default class ProductService {
  /** @param {ProductRepository} repository */
  constructor(repository) {
    this.repository = repository;
  }

  async create(data) {
    return this.repository.create(data);
  }

  async getAll() {
    return this.repository.getMany();
  }

  async getOne(id) {
    return this.repository.getOne(id);
  }

  async update(id, data) {
    const product = await this.repository.getOne(id);
    if (!product) throw new Error("Product not found!");
    return this.repository.update(id, data);
  }

  async delete(id) {
    const product = await this.repository.getOne(id);
    if (!product) throw new Error("Product not found!");
    return this.repository.delete(id);
  }
}

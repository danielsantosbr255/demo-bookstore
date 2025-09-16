import { IDatabase } from '@/config/database/IDatabase.js';
import { Product } from './dto/Product.js';
import { IProductRepository } from './products.interface.js';

export default class ProductRepository implements IProductRepository {
  private table = 'products';

  constructor(private readonly database: IDatabase) {}

  async create(data: Product) {
    return this.database.table<Product>(this.table).create({ data });
  }

  async findMany() {
    return this.database.table<Product>(this.table).findMany();
  }

  async findById(id: number) {
    return this.database.table<Product>(this.table).findUnique({ where: { id } });
  }

  async update(id: number, data: Product) {
    return this.database.table<Product>(this.table).update({ where: { id }, data });
  }

  async delete(id: number) {
    return await this.database.table<Product>(this.table).delete({ where: { id } });
  }
}

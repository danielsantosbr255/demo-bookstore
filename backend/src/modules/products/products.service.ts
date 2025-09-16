import { Product } from './dto/Product';
import IProductRepository from './products.repository';

export default class ProductService {
  constructor(private readonly repository: IProductRepository) {}

  async create(data: Product) {
    return this.repository.create(data);
  }

  async findMany() {
    return this.repository.findMany();
  }

  async findById(id: number) {
    return this.repository.findById(id);
  }

  async update(id: number, data: Product) {
    const product = await this.repository.findById(id);
    if (!product) throw new Error('Product not found!');
    return this.repository.update(id, data);
  }

  async delete(id: number) {
    const product = await this.repository.findById(id);
    if (!product) throw new Error('Product not found!');
    return this.repository.delete(id);
  }
}

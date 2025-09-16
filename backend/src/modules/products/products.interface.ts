import { Product } from './dto/Product';

export interface IProductRepository {
  create(data: Product): Promise<Product>;
  findMany(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  update(id: number, data: Product): Promise<Product>;
  delete(id: number): Promise<Product>;
}

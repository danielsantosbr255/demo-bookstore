import { Request, Response } from 'express';
import { Product } from './dto/Product';
import ProductsService from './products.service';

export default class ProductsController {
  constructor(private readonly service: ProductsService) {}

  create = async (req: Request, res: Response) => {
    const { title, description, slug, price, categoryId, brandId } = req.body as Product;

    const product = new Product(title, description, slug, price, categoryId, brandId);
    const createdProduct = await this.service.create(product);

    res.status(201).json({ message: 'Product created successfuly!', data: createdProduct });
  };

  findMany = async (_: Request, res: Response) => {
    const products = await this.service.findMany();
    res.json({ message: 'All Products', data: products });
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const product = await this.service.findById(parseInt(id));
    res.json({ message: 'Product', data: product });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const data = req.body as Product;
    const product = await this.service.update(parseInt(id), data);
    res.json({ message: 'Product updated successfuly!', data: product });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const product = await this.service.delete(parseInt(id));
    res.json({ message: 'Product deleted successfuly!', data: product });
  };
}

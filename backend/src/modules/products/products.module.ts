import { IModule } from '@/config/core/IModule.js';
import { getDb } from '@/config/database/client.js';
import express from 'express';
import ProductsController from './products.controller.js';
import IProductRepository from './products.repository.js';
import ProductService from './products.service.js';

export default class ProductsModule implements IModule {
  public readonly name = 'products';

  private readonly repository = new IProductRepository(getDb());
  private readonly service = new ProductService(this.repository);
  private readonly controller = new ProductsController(this.service);

  constructor(public router: express.Router) {
    this.router.get('/', this.controller.findMany);
    this.router.get('/:id', this.controller.findById);
    this.router.post('/', this.controller.create);
    this.router.put('/:id', this.controller.update);
    this.router.delete('/:id', this.controller.delete);
  }

  static create() {
    const router = express.Router();
    return new ProductsModule(router);
  }
}

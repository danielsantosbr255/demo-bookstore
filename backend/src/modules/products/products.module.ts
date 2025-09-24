import { AuthGuard } from '@/common/middlewares/auth.middleware.js';
import { IModule } from '@/config/core/IModule.js';
import { getDb } from '@/config/database/index.js';
import { Router } from 'express';
import ProductsController from './products.controller.js';
import IProductRepository from './products.repository.js';
import ProductService from './products.service.js';

export class ProductsModule implements IModule {
  public name = 'products';
  public router: Router = Router();

  readonly repository = new IProductRepository(getDb());
  readonly service = new ProductService(this.repository);
  readonly controller = new ProductsController(this.service);

  constructor() {
    this.router.post('/', AuthGuard, this.controller.create);
    this.router.get('/', this.controller.findMany);
    this.router.get('/:id', this.controller.findById);
    this.router.put('/:id', AuthGuard, this.controller.update);
    this.router.delete('/:id', AuthGuard, this.controller.delete);
  }
}

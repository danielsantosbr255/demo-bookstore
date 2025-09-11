import express from 'express';

import ProductsController from './products.controller.js';
import ProductRepository from './products.repository.js';
import ProductService from './products.service.js';

export default class ProductsModule {
  constructor() {
    this.name = 'products';
    this.repository = new ProductRepository();
    this.service = new ProductService(this.repository);
    this.controller = new ProductsController(this.service);
    this.router = this._buildRouter();
  }

  _buildRouter() {
    const router = express.Router();

    router.get('/', this.controller.getAll);
    router.get('/:id', this.controller.getOne);
    router.post('/', this.controller.create);
    router.put('/:id', this.controller.update);
    router.delete('/:id', this.controller.delete);

    return router;
  }

  static create() {
    return new ProductsModule();
  }
}

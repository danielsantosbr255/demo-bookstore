import express from 'express';
import UsersService from './users.service.js';
import UsersController from './users.controller.js';
import UsersRepository from './users.repository.js';

export default class UsersModule {
  constructor() {
    this.name = 'users';
    this.repository = new UsersRepository();
    this.service = new UsersService(this.repository);
    this.controller = new UsersController(this.service);
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
    return new UsersModule();
  }
}

// .bind(this.controller)

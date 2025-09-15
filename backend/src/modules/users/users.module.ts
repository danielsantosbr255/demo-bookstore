import express from 'express';

import { getDb } from '../../config/database/client';
import UsersController from './users.controller';
import UserRepository from './users.repository';
import UsersService from './users.service';

export default class UsersModule {
  public readonly name = 'users';

  private readonly repository = new UserRepository(getDb());
  private readonly service = new UsersService(this.repository);
  private readonly controller = new UsersController(this.service);
  public readonly router = this._buildRouter();

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

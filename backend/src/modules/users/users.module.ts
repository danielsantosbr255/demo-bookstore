import express from 'express';

import IDatabase from '@/config/database/IDatabase';
import database from '../../config/database/client';
import { User } from './DTO/User';
import UsersController from './users.controller';
import UserRepository from './users.repository';
import UsersService from './users.service';

export default class UsersModule {
  public readonly name: string = 'users';
  public readonly router: express.Router;

  private readonly repository: UserRepository;
  private readonly service: UsersService;
  private readonly controller: UsersController;

  constructor() {
    this.name = 'users';
    this.repository = new UserRepository(database as IDatabase<User>);
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

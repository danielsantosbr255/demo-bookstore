import { IModule } from '@/config/core/IModule';
import { getDb } from '@/config/database/client';
import express from 'express';
import UsersController from './users.controller';
import UserRepository from './users.repository';
import UsersService from './users.service';

export default class UsersModule implements IModule {
  public readonly name = 'users';

  private readonly repository = new UserRepository(getDb());
  private readonly service = new UsersService(this.repository);
  private readonly controller = new UsersController(this.service);

  constructor(public router: express.Router) {
    this.router.get('/', this.controller.getAll);
    this.router.get('/:id', this.controller.getOne);
    this.router.post('/', this.controller.create);
    this.router.put('/:id', this.controller.update);
    this.router.delete('/:id', this.controller.delete);
  }

  static create() {
    const router = express.Router();
    return new UsersModule(router);
  }
}

import { AuthGuard } from '@/common/middlewares/auth.middleware';
import { IModule } from '@/config/core/IModule';
import { getDb } from '@/config/database';
import { Router } from 'express';
import UsersController from './users.controller';
import UserRepository from './users.repository';
import UsersService from './users.service';

export class UsersModule implements IModule {
  readonly name = 'users';
  readonly router: Router = Router();

  readonly repository = new UserRepository(getDb());
  readonly service = new UsersService(this.repository);
  readonly controller = new UsersController(this.service);

  constructor() {
    this.router.get('/', this.controller.getAll);
    this.router.post('/', AuthGuard, this.controller.create);
    this.router.get('/:id', AuthGuard, this.controller.getOne);
    this.router.put('/:id', AuthGuard, this.controller.update);
    this.router.delete('/:id', AuthGuard, this.controller.delete);
  }
}

import { getDb } from '@/common/database';
import { AuthGuard } from '@/common/middlewares/auth.middleware';
import { IModule } from '@/core/IModule';
import { Router } from 'express';
import UsersController from './users.controller';
import UsersService from './users.service';

export class UsersModule implements IModule {
  readonly name = 'users';
  readonly router: Router = Router();

  readonly service = new UsersService(getDb());
  readonly controller = new UsersController(this.service);

  constructor() {
    this.router.get('/', this.controller.getMany);
    this.router.post('/', AuthGuard, this.controller.create);
    this.router.get('/:id', AuthGuard, this.controller.getById);
    this.router.put('/:id', AuthGuard, this.controller.update);
    this.router.delete('/:id', AuthGuard, this.controller.delete);
  }
}

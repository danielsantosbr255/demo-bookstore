import { AuthGuard } from '@/common/middlewares/auth.middleware';
import { IModule } from '@/config/core/IModule';
import { getDb } from '@/config/database/client';
import { Router } from 'express';
import UsersController from './users.controller';
import UserRepository from './users.repository';
import UsersService from './users.service';

export default class UsersModule implements IModule {
  public readonly name = 'users';

  private readonly repository = new UserRepository(getDb());
  private readonly service = new UsersService(this.repository);
  private readonly controller = new UsersController(this.service);

  constructor(public router: Router) {
    this.router.get('/', this.controller.getAll);
    this.router.post('/', AuthGuard, this.controller.create);
    this.router.get('/:id', AuthGuard, this.controller.getOne);
    this.router.put('/:id', AuthGuard, this.controller.update);
    this.router.delete('/:id', AuthGuard, this.controller.delete);
  }

  static create() {
    const router = Router();
    return new UsersModule(router);
  }
}

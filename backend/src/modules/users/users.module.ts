import { getDb } from '@/common/database';
import { AuthGuard } from '@/common/middlewares/auth.middleware';
import { AppRouter, IModule } from '@/core/IModule';
import UsersController from './users.controller';
import UsersService from './users.service';

export class UsersModule implements IModule {
  readonly name = 'users';

  readonly service = new UsersService(getDb());
  readonly controller = new UsersController(this.service);

  constructor(readonly router: AppRouter) {
    this.router.get('/', this.controller.getMany);
    this.router.post('/', AuthGuard, this.controller.create);
    this.router.get('/:id', AuthGuard, this.controller.getById);
    this.router.put('/:id', AuthGuard, this.controller.update);
    this.router.delete('/:id', AuthGuard, this.controller.delete);
  }
}

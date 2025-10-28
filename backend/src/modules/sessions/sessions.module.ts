import { getDb } from '@/common/database';
import { AppRouter, IModule } from '@/core/IModule';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

export class SessionsModule implements IModule {
  name = 'sessions';

  readonly service = new SessionsService(getDb());
  readonly controller = new SessionsController(this.service);

  constructor(readonly router: AppRouter) {
    this.router.post('/', this.controller.create);
    this.router.get('/', this.controller.getMany);
    this.router.get('/:id', this.controller.getById);
    this.router.delete('/:id', this.controller.delete);
  }
}

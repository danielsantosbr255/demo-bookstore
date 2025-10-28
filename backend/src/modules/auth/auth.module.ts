import { getDb } from '@/common/database';
import { AuthGuard } from '@/common/middlewares/auth.middleware';
import { AppRouter, IModule } from '@/core/IModule';
import { SessionsService } from '../sessions/sessions.service';
import UsersService from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

export class AuthModule implements IModule {
  readonly name = 'auth';

  readonly userService = new UsersService(getDb());
  readonly sessionsService = new SessionsService(getDb());
  readonly service = new AuthService(this.userService);
  readonly controller = new AuthController(this.service, this.sessionsService);

  constructor(readonly router: AppRouter) {
    this.router.post('/sign-up', this.controller.signUp);
    this.router.post('/sign-in', this.controller.signIn);
    this.router.post('/sign-out', AuthGuard, this.controller.signOut);
  }
}

import { AppController } from './app.controller';
import { AppRouter, IModule } from './core/IModule';
import { AuthModule } from './modules/auth/auth.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { UsersModule } from './modules/users/users.module';

export class AppModule implements IModule {
  readonly name = '/';

  readonly imports = [UsersModule, AuthModule, SessionsModule];
  readonly controller = new AppController();

  constructor(readonly router: AppRouter) {
    this.router.get('/', this.controller.getHello);
    this.router.get('/health', this.controller.getHealth);
  }
}

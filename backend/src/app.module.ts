import { Router } from 'express';
import { AppController } from './app.controller';
import { IModule } from './config/core/IModule';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

export class AppModule implements IModule {
  readonly name = '/';
  readonly router: Router = Router();

  readonly imports = [UsersModule, AuthModule];
  readonly controller = new AppController();

  constructor() {
    this.router.get('/', this.controller.getHello);
    this.router.get('/health', this.controller.getHealth);
  }
}

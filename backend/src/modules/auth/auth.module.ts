import { getDb } from '@/common/database';
import { IModule } from '@/core/IModule';
import { Router } from 'express';
import UsersService from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

export class AuthModule implements IModule {
  readonly name = 'auth';
  readonly router: Router = Router();

  readonly userService = new UsersService(getDb());
  readonly service = new AuthService(this.userService);
  readonly controller = new AuthController(this.service);

  constructor() {
    this.router.post('/sign-up', this.controller.signUp);
    this.router.post('/sign-in', this.controller.signIn);
    this.router.post('/sign-out', this.controller.signOut);
  }
}

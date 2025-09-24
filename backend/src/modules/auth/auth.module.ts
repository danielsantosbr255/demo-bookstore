import { IModule } from '@/config/core/IModule';
import { getDb } from '@/config/database';
import { Router } from 'express';
import UserRepository from '../users/users.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

export class AuthModule implements IModule {
  readonly name = 'auth';
  readonly router: Router = Router();

  readonly repository = new UserRepository(getDb());
  readonly service = new AuthService(this.repository);
  readonly controller = new AuthController(this.service);

  constructor() {
    this.router.post('/sign-up', this.controller.signUp);
    this.router.post('/sign-in', this.controller.signIn);
    this.router.post('/sign-out', this.controller.signOut);
  }
}

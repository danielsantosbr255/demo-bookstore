import { IModule } from '@/config/core/IModule';
import { getDb } from '@/config/database/client';
import { Router } from 'express';
import UserRepository from '../users/users.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

export class AuthModule implements IModule {
  public readonly name = 'auth';

  private readonly repository = new UserRepository(getDb());
  private readonly service = new AuthService(this.repository);
  private readonly controller = new AuthController(this.service);

  constructor(public router: Router) {
    this.router.post('/sign-up', this.controller.signUp);
    this.router.post('/sign-in', this.controller.signIn);
    this.router.post('/sign-out', this.controller.signOut);
  }

  static create() {
    const router = Router();
    return new AuthModule(router);
  }
}

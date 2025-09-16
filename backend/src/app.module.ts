import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Router } from 'express';
import { AppController } from './app.controller';
import logger from './common/utils/logger';
import { IModuleConstructor } from './config/core/IModule';
import { AuthModule } from './modules/auth/auth.module';
import ProductsModule from './modules/products/products.module';
import UsersModule from './modules/users/users.module';

export default class AppModule {
  public readonly name = '/api/v1';
  public readonly router = Router();

  private readonly modules: IModuleConstructor[] = [UsersModule, ProductsModule, AuthModule];
  private readonly controller = new AppController();

  constructor(public app: Application) {
    this.init(app);
  }

  init(app: Application) {
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({ origin: '*', credentials: true }));
    app.use(express.urlencoded({ extended: true }));

    this.router.get('/', this.controller.getHello);

    for (const mod of this.modules) {
      const module = mod.create();
      const path = `/${module.name}`;
      this.router.use(path, module.router);
      logger.info(`📝 Registered module '${module.name}' at ${this.name}${path}`);
    }

    app.use(this.name, this.router);
    app.use((_, res) => res.status(404).json({ message: 'Route not found!' }));
  }
}

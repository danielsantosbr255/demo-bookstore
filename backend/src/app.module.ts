import express, { Application } from 'express';
import { AppController } from './app.controller';
import logger from './common/utils/logger';
import { IModuleConstructor } from './config/core/IModule';
import ProductsModule from './modules/products/products.module';
import UsersModule from './modules/users/users.module';

export default class AppModule {
  public readonly name = '/api/v1';
  public readonly router = express.Router();

  private readonly modules: IModuleConstructor[] = [UsersModule, ProductsModule];
  private readonly controller = new AppController();

  constructor(public app: Application) {
    this.init(app);
  }

  init(app: Application) {
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

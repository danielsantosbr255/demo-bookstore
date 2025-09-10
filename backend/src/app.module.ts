import logger from './common/utils/logger.js';
import UsersModule from './modules/users/users.module.js';
import ProductsModule from './modules/products/products.module.js';
import { Application, Router } from 'express';

interface ModuleI {
  name: string;
  repository: unknown;
  service: unknown;
  controller: unknown;
  router: Router;
}

export default class AppModule {
  prefix: string;
  modules: ModuleI[];

  constructor() {
    this.prefix = '/api/v1';
    this.modules = [UsersModule.create(), ProductsModule.create()];
  }

  init(app: Application) {
    for (const mod of this.modules) {
      const path = `${this.prefix}/${mod.name}`;
      app.use(path, mod.router);
      logger.info(`📝 Registered module '${mod.name}' at ${path}`);
    }

    app.use((_, res) => res.status(404).json({ message: 'Route not found!' }));
  }
}

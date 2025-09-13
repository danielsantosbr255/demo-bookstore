import { Application, Router } from 'express';

import logger from './common/utils/logger.js';
// import ProductsModule from './modules/products/products.module';
import UsersModule from './modules/users/users.module';

interface ModuleI {
  name: string;
  router: Router;
}

export default class AppModule {
  prefix: string;
  modules: ModuleI[];

  constructor() {
    this.prefix = '/api/v1';
    this.modules = [UsersModule.create()];
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

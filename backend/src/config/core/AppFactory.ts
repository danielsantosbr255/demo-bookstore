import errorHandler from '@/common/middlewares/error.handler';
import logger from '@/common/utils/logger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { IModule } from './IModule';

export function createApp(rootModule: new () => IModule): Application {
  const app = express();
  const router = express.Router();
  const prefix = process.env.API_PREFIX ?? '/api/v1';

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({ origin: '*', credentials: true }));
  app.use(express.urlencoded({ extended: true }));

  const newRootModule = new rootModule();

  router.use(newRootModule.name, newRootModule.router);

  if (newRootModule.imports) {
    for (const mod of newRootModule.imports) {
      const module = new mod();
      const path = `/${module.name}`;

      router.use(path, module.router);
      logger.info(`📝 Registered module '${module.name}' at ${module.name}${path}`);
    }
  }

  app.use(prefix, router);

  app.use((_, res) => res.status(404).json({ message: 'Route not found!' }));

  app.use(errorHandler);

  return app;
}

import errorHandler from '@/common/middlewares/error.handler';
import logger from '@/common/utils/logger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { IModule } from './IModule';

export class AppFactory {
  private readonly app = express();
  private readonly router = express.Router();

  constructor(private readonly rootModule: IModule) {
    this.enableCors();
    this.registerMiddlewares();
    this.setGlobalPrefix('/api/v1');
    this.registerRouter();
    this.useErrorHandler();
  }

  static create(rootModule: new () => IModule): AppFactory {
    return new AppFactory(new rootModule());
  }

  public enableCors(): void {
    this.app.use(cors({ origin: '*', credentials: true }));
  }

  private registerMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public setGlobalPrefix(prefix: string): void {
    this.app.use(prefix, this.router);
  }

  private registerRouter(): void {
    this.router.use(this.rootModule.name, this.rootModule.router);

    if (this.rootModule.imports) {
      for (const mod of this.rootModule.imports) {
        const module = new mod();
        const path = `/${module.name}`;

        this.router.use(path, module.router);
        logger.info(`📝 Registered module '${module.name}' at ${module.name}${path}`);
      }
    }

    this.app.use((_, res) => res.status(404).json({ message: 'Route not found!' }));
  }

  private useErrorHandler(): void {
    this.app.use(errorHandler);
  }

  public listen(port: number) {
    const server = this.app.listen(port, () => {
      logger.info(`🚀 Server running: http://localhost:${port}/api/v1`);
    });

    server.on('error', err => {
      logger.error('❌ Server failed to start:', err);
      process.exit(1);
    });
  }
}

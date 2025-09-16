import express, { Application } from 'express';

export function createApp(rootModule: new (app: Application) => unknown): Application {
  const app = express();

  new rootModule(app);

  return app;
}

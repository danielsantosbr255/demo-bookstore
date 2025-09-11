import cors from 'cors';
import express from 'express';

import AppModule from './app.module';
import errorHandler from './common/middlewares/error.handler.js';
import logger from './common/utils/logger.js';
import database from './config/database/database.js';

async function bootstrap() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  await database.connect();

  const appModule = new AppModule();
  appModule.init(app);

  app.use(errorHandler);

  const PORT = process.env['PORT'] || 5000;

  app.listen(PORT, () => {
    logger.info(`🚀 Server running: http://localhost:${PORT}/api/v1`);
  });
}

bootstrap().catch(err => {
  logger.error('❌ Bootstrap error:', err);
  process.exit(1);
});
// Test comment

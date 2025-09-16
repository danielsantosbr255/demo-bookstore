import AppModule from './app.module';
import errorHandler from './common/middlewares/error.handler';
import logger from './common/utils/logger';
import { createApp } from './config/core/Factory';
import { initDb } from './config/database/client';

const bootstrap = async () => {
  await initDb();

  const app = createApp(AppModule);

  app.use(errorHandler);

  const PORT = process.env.PORT ?? 5000;

  app.listen(PORT, () => {
    logger.info(`🚀 Server running: http://localhost:${PORT.toString()}/api/v1`);
  });
};

bootstrap().catch((err: unknown) => {
  logger.error('❌ Bootstrap error:', err);
  process.exit(1);
});

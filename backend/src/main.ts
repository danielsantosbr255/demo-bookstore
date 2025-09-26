import { AppModule } from './app.module';
import logger from './common/utils/logger';
import { createApp } from './config/core/AppFactory';
import { config } from './config/core/config';
import { initDb } from './config/database';

const bootstrap = async () => {
  await initDb();

  const app = createApp(AppModule);

  const server = app.listen(config.port, () => {
    logger.info(`🚀 Server running: http://localhost:${config.port}/api/v1`);
  });

  server.on('error', err => {
    logger.error('❌ Server failed to start:', err);
    process.exit(1);
  });
};

bootstrap().catch((err: unknown) => {
  logger.error('❌ Bootstrap error:', err);
  process.exit(1);
});

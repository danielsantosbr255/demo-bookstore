import { AppModule } from './app.module';
import logger from './common/utils/logger';
import { createApp } from './config/core/AppFactory';
import { initDb } from './config/database';

const bootstrap = async () => {
  await initDb();

  const app = createApp(AppModule);

  const PORT = process.env.PORT ?? 5000;

  const server = app.listen(PORT, () => {
    logger.info(`🚀 Server running: http://localhost:${PORT}/api/v1`);
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

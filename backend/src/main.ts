import { AppModule } from './app.module';
import logger from './common/utils/logger';
import { AppFactory } from './config/core/AppFactory';
import { config } from './config/core/config';
import { initDb } from './config/database';

const bootstrap = async () => {
  await initDb();

  const app = AppFactory.create(AppModule);

  app.listen(config.port);
};

bootstrap().catch((err: unknown) => {
  logger.error('❌ Bootstrap error:', err);
  process.exit(1);
});

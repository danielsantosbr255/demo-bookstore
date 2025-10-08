import { AppModule } from './app.module';
import { initDb } from './common/database';
import logger from './common/utils/logger';
import { AppFactory } from './core/AppFactory';
import { config } from './core/config';

const bootstrap = async () => {
  await initDb();

  const app = AppFactory.create(AppModule);

  app.listen(config.port);
};

bootstrap().catch((err: unknown) => {
  logger.error('❌ Bootstrap error:', err);
  process.exit(1);
});

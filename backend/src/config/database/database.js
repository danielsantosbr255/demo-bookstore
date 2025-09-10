process.loadEnvFile();

import { Pool } from 'pg';
import logger from '../../common/utils/logger.js';

class Database {
  constructor() {
    this.db = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
  }

  async connect() {
    try {
      await this.db.connect();
      logger.info('🏦 Database connected!');
    } catch (error) {
      logger.error(error);
    }
  }

  async disconnect() {
    try {
      await this.db.end();
      logger.info('🏦 Database disconnected!');
    } catch (error) {
      logger.error(error);
    }
  }

  getClient() {
    return this.db;
  }
}

export default new Database();

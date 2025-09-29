// database/index.ts
// import { config } from '../core/config';
import { IDatabase } from './IDatabase';
import { MemoryAdapter } from './in-memory/in-memory.adapter.ts';
// import { PostgresAdapter } from './postgres/postgres.adapter.js';

let dbInstance: IDatabase | null = null;

export const initDb = async (): Promise<void> => {
  if (dbInstance) return; // evita inicializar mais de uma vez

  dbInstance = new MemoryAdapter();
  // dbInstance = new PostgresAdapter({
  //   user: config.db.username,
  //   host: config.db.host,
  //   database: config.db.database,
  //   password: config.db.password,
  //   port: config.db.port,
  // });

  await dbInstance.connect();
};

export const getDb = (): IDatabase => {
  if (!dbInstance) {
    throw new Error('DB não inicializado. Chame initDb() primeiro.');
  }
  return dbInstance;
};

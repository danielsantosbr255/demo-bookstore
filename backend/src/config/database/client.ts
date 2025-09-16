// import { MemoryAdapter } from './adapters/in-memory.adapter.ts';
import { PostgresAdapter } from './adapters/postgres.adapter.js';
import { IDatabase } from './IDatabase';

let dbInstance: IDatabase;

export const initDb = async () => {
  // dbInstance = new MemoryAdapter();

  dbInstance = new PostgresAdapter({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
  });
  await dbInstance.connect();
};

export const getDb = (): IDatabase => {
  if (!dbInstance) throw new Error('DB não inicializado. Chame initDb() primeiro.');
  return dbInstance;
};

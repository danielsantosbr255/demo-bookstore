// database/index.ts
import { IDatabase } from './IDatabase';
// import { MemoryAdapter } from './in-memory/in-memory.adapter.ts';
import { PostgresAdapter } from './postgres/postgres.adapter.js';

let dbInstance: IDatabase | null = null;

export const initDb = async (): Promise<void> => {
  if (dbInstance) return; // evita inicializar mais de uma vez

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
  if (!dbInstance) {
    throw new Error('DB não inicializado. Chame initDb() primeiro.');
  }
  return dbInstance;
};

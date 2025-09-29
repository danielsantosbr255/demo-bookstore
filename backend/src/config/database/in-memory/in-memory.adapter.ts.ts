import logger from '@/common/utils/logger';
import {
  CountArgs,
  CreateArgs,
  DeleteArgs,
  FindArgs,
  FindUniqueArgs,
  IDatabase,
  ITable,
  UpdateArgs,
} from '../IDatabase';

class MemoryTable<T> implements ITable<T> {
  private rows: T[] = [];
  private readonly delay = 100;

  create(args: CreateArgs<T>): Promise<T> {
    const data = args.data;
    this.rows.push(data);
    return new Promise(resolve => setTimeout(() => resolve(data), this.delay));
  }

  findMany(args?: FindArgs<T> | undefined): Promise<T[]> {
    const where = args?.where;
    if (where && Object.keys(where).length > 0) {
      const keys = Object.keys(where) as (keyof T)[];
      return new Promise(resolve =>
        setTimeout(() => resolve(this.rows.filter(r => keys.every(key => r[key] === where[key]))), this.delay)
      );
    }
    return new Promise(resolve => setTimeout(() => resolve(this.rows), this.delay));
  }

  findUnique(args: FindUniqueArgs<T>): Promise<T | null> {
    const where = args.where;
    if (!where || Object.keys(where).length === 0) throw new Error("findUnique requer parâmetro 'where'");

    const keys = Object.keys(where) as (keyof T)[];
    const row = this.rows.find(r => keys.every(key => r[key] === where[key]));

    return new Promise(resolve => setTimeout(() => resolve(row ?? null), this.delay));
  }

  update(args: UpdateArgs<T>): Promise<T> {
    const where = args.where;
    const data = args.data;
    const keys = Object.keys(where) as (keyof T)[];
    const rowIndex = this.rows.findIndex(r => keys.every(key => r[key] === where[key]));

    if (rowIndex === -1) throw new Error('Registro não encontrado para atualização');

    const updatedRow = { ...(this.rows[rowIndex] as T), ...data };
    this.rows[rowIndex] = updatedRow;
    return new Promise(resolve => setTimeout(() => resolve(updatedRow), this.delay));
  }

  delete(args: DeleteArgs<T>): Promise<T> {
    const where = args.where;
    const keys = Object.keys(where) as (keyof T)[];
    const rowIndex = this.rows.findIndex(r => keys.every(key => r[key] === where[key]));

    if (rowIndex === -1) throw new Error('Registro não encontrado para exclusão');

    const deletedRow = this.rows[rowIndex] as T;
    this.rows.splice(rowIndex, 1);
    return new Promise(resolve => setTimeout(() => resolve(deletedRow), this.delay));
  }

  count(args: CountArgs<T>): Promise<number> {
    const where = args.where;
    if (where && Object.keys(where).length > 0) {
      const keys = Object.keys(where) as (keyof T)[];
      return new Promise(resolve =>
        setTimeout(
          () => resolve(this.rows.filter(r => keys.every(key => r[key] === where[key])).length),
          this.delay
        )
      );
    }
    return new Promise(resolve => setTimeout(() => resolve(this.rows.length), this.delay));
  }
}

export class MemoryAdapter implements IDatabase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tables: Record<string, MemoryTable<any>> = {};

  async connect() {
    logger.info('✅ Banco em memória conectado');
  }

  async disconnect() {
    logger.info('✅ Banco em memória desconectado');
  }

  table<T>(name: string) {
    this.tables[name] ??= new MemoryTable<T>();
    return this.tables[name] as ITable<T>;
  }
}

import logger from '@/common/utils/logger';
import { IDatabase, ITable } from '../IDatabase';

class MemoryTable<T> implements ITable<T> {
  private rows: T[] = [];

  async create(object: { data: T }): Promise<T> {
    this.rows.push(object.data);
    return object.data;
  }

  async findUnique(object: { where: Partial<T> }) {
    const where = object.where;
    const keys = Object.keys(where) as (keyof T)[];
    const row = this.rows.find(r => keys.every(key => r[key] === where[key]));
    return row || null;
  }

  async findMany() {
    return this.rows;
  }

  async update(object: { where: Partial<T>; data: Partial<T> }) {
    const where = object.where;
    const data = object.data;
    const keys = Object.keys(where) as (keyof T)[];
    const rowIndex = this.rows.findIndex(r => keys.every(key => r[key] === where[key]));

    if (rowIndex === -1) throw new Error('Registro não encontrado para atualização');

    const updatedRow = { ...(this.rows[rowIndex] as T), ...data };
    this.rows[rowIndex] = updatedRow;
    return updatedRow;
  }

  async delete(object: { where: Partial<T> }) {
    const where = object.where;
    const keys = Object.keys(where) as (keyof T)[];
    const rowIndex = this.rows.findIndex(r => keys.every(key => r[key] === where[key]));

    if (rowIndex === -1) throw new Error('Registro não encontrado para exclusão');

    const deletedRow = this.rows[rowIndex] as T;
    this.rows.splice(rowIndex, 1);
    return deletedRow;
  }

  async count() {
    return this.rows.length;
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
    if (!this.tables[name]) this.tables[name] = new MemoryTable<T>();
    return this.tables[name] as ITable<T>;
  }
}

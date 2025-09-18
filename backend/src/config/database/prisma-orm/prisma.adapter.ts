import { PrismaClient } from '@prisma/client';
import { IDatabase, ITable } from '../IDatabase';

interface IPrismaModelDelegate<T> {
  create: (args: T) => Promise<T>;
  findMany: (args?: object) => Promise<T[]>;
  findUnique: (args: object) => Promise<T | null>;
  update: (args: object) => Promise<T>;
  delete: (args: object) => Promise<T>;
  count: (args: object) => Promise<number>;
}

class PrismaTable<T> implements ITable<T> {
  constructor(private readonly table: IPrismaModelDelegate<T>) {}

  async create(object: { data: T }) {
    return await this.table.create(object.data);
  }

  async findMany(object: { where?: object } = {}) {
    if (!object.where) return await this.table.findMany();
    return await this.table.findMany(object.where);
  }

  async findUnique(object: { where: object }) {
    return await this.table.findUnique(object.where);
  }

  async update(object: { data: object }) {
    return await this.table.update(object.data);
  }

  async delete(object: { data: object }) {
    return await this.table.delete(object.data);
  }

  async count(object: { data: object }) {
    return await this.table.count(object.data);
  }
}

export class PrismaAdapter implements IDatabase {
  private _table = new PrismaClient();

  table<T>(table: typeof PrismaClient.schema): ITable<T> {
    return new PrismaTable<T>(table);
  }

  async connect(): Promise<void> {
    await this._table.$connect();
  }

  async disconnect(): Promise<void> {
    await this._table.$disconnect();
  }
}

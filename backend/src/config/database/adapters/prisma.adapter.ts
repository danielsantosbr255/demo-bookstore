import { IDatabase } from '../IDatabase';

const PrismaClient = {
  schema: {
    create: async (data: object) => data,
    findMany: async (data: object) => [data],
    findUnique: async (data: object) => data,
    update: async (data: object) => data,
    delete: async (data: object) => data,
    count: async (data: object) => {
      console.log(data);
      return 1;
    },
    connect: async () => {
      console.log('connect');
    },
    disconnect: async () => {
      console.log('disconnect');
    },
  },
};

export class PrismaAdapter implements IDatabase {
  private _table: typeof PrismaClient.schema = PrismaClient.schema;

  table(table: typeof PrismaClient.schema) {
    this._table = table;
    return this;
  }

  async create(object: { data: object }): Promise<object> {
    return await this._table.create(object.data);
  }

  async findMany(object: { data: object }): Promise<object[]> {
    return await this._table.findMany(object.data);
  }

  async findUnique(object: { where: object }): Promise<object> {
    return await this._table.findUnique(object.where);
  }

  async update(object: { data: object }): Promise<object> {
    return await this._table.update(object.data);
  }

  async delete(object: { data: object }): Promise<object> {
    return await this._table.delete(object.data);
  }

  async count(object: { data: object }): Promise<number> {
    return await this._table.count(object.data);
  }

  async connect(): Promise<void> {
    await this._table.connect();
  }

  async disconnect(): Promise<void> {
    await this._table.disconnect();
  }
}

import { PrismaClient } from '@prisma/client';
import { IDatabase, ITable } from '../IDatabase';

class PrismaTable<T> implements ITable<T> {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly table: string
  ) {}

  async create({ data }: { data: T }) {
    return await this.prisma[this.table].create<T>({ data });
  }

  async findMany({ where }: { where?: T }) {
    if (!where) return (await this.prisma[this.table].findMany()) as T[];
    return (await this.prisma[this.table].findMany({ where })) as T[];
  }

  async findUnique(object: { where: object }) {
    return await this.prisma[this.table].findUnique(object.where);
  }

  async update(object: { data: object }) {
    return await this.prisma[this.table].update(object.data);
  }

  async delete({ where }: { where: T }) {
    return await this.prisma[this.table].delete({ where });
  }

  async count({ where }: { where: T }) {
    return await this.prisma[this.table].count({ where });
  }
}

export class PrismaAdapter implements IDatabase {
  private prisma = new PrismaClient();

  table<T>(table: string): ITable<T> {
    return new PrismaTable<T>(this.prisma, table);
  }

  async connect(): Promise<void> {
    await this.prisma.$connect();
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}

import { PrismaClient } from '@prisma/client';
import { IDatabase, ITable } from '../IDatabase';
import { CountArgs, CreateArgs, DeleteArgs, FindArgs, FindUniqueArgs, UpdateArgs } from '../IDatabase.js';

class PrismaTable<T> implements ITable<T> {
constructor(
private readonly prisma: PrismaClient,
private readonly table: string
) {}

async create(args: CreateArgs<T>): Promise<T> {
return await this.prisma[this.table].create<T>({
data: args.data,
select: args.select,
omit: args.omit,
});
}

async findMany(args?: FindArgs<T>): Promise<T[]> {
return await this.prisma[this.table].findMany({
where: args?.where,
skip: args?.offset,
take: args?.limit,
});
}

async findUnique(args: FindUniqueArgs<T>): Promise<T | null> {
return await this.prisma[this.table].findUnique({
where: args.where,
select: args.select,
omit: args.omit,
});
}

async update(args: UpdateArgs<T>): Promise<T> {
return await this.prisma[this.table].update({
where: args.where,
data: args.data,
select: args.select,
omit: args.omit,
});
}

async delete(args: DeleteArgs<T>): Promise<T> {
return await this.prisma[this.table].delete({
where: args.where,
select: args.select,
omit: args.omit,
});
}

async count(args: CountArgs<T> = {}): Promise<number> {
const { where } = args;
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

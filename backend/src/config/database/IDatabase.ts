export default interface IDatabase<T> {
  create: ({ data }: { data: T }) => Promise<T>;
  findMany: (object?: object) => Promise<T[]>;
  findUnique: (object: object) => Promise<T>;
  update: (object: object) => Promise<T>;
  delete: (object: object) => Promise<T>;
  count: (object: object) => Promise<number>;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  model?: unknown;
  schema?: unknown;
}

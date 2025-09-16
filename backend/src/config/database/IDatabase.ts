export interface IDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  table<T>(table: unknown): ITable<T>;
}

export interface ITable<T> {
  create(object: object): Promise<T>;
  findMany(object?: object): Promise<T[]>;
  findUnique(object: object): Promise<T | null>;
  update(object: object): Promise<T>;
  delete(data: object): Promise<T>;
  count(data: object): Promise<number>;
}

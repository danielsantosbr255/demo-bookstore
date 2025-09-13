export default interface IRepository<T> {
  create: (data: T) => Promise<T>;
  findById: (id: number) => Promise<T>;
  findMany: () => Promise<T[]>;
  update: (id: number, data: T) => Promise<T>;
  delete: (id: number) => Promise<void>;
}

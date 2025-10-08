export type SelectArgs<T> = (keyof T)[];
export type OmitArgs<T> = (keyof T)[];

export type CreateArgs<T> = {
  data: T;
  select?: SelectArgs<T>;
  omit?: OmitArgs<T>;
};

export type FindArgs<T> = {
  where?: Partial<T>;
  offset?: number;
  limit?: number;
  select?: SelectArgs<T>;
  omit?: OmitArgs<T>;
};

export type FindUniqueArgs<T> = {
  where: Partial<T>;
  select?: SelectArgs<T>;
  omit?: OmitArgs<T>;
};

export type UpdateArgs<T> = {
  where: Partial<T>;
  data: Partial<T>;
  select?: SelectArgs<T>;
  omit?: OmitArgs<T>;
};

export type DeleteArgs<T> = {
  where: Partial<T>;
  select?: SelectArgs<T>;
  omit?: OmitArgs<T>;
};

export type CountArgs<T> = {
  where?: Partial<T>;
};

export interface ITable<T> {
  create(args: CreateArgs<T>): Promise<T>;
  findMany(args?: FindArgs<T>): Promise<T[]>;
  findUnique(args: FindUniqueArgs<T>): Promise<T | null>;
  update(args: UpdateArgs<T>): Promise<T>;
  delete(args: DeleteArgs<T>): Promise<T>;
  count(args: CountArgs<T>): Promise<number>;
}

export interface IDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  table<T>(table: string): ITable<T>;
}

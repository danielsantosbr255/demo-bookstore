import logger from '@/common/utils/logger';
import { Pool, PoolConfig } from 'pg';
import {
  CountArgs,
  CreateArgs,
  DeleteArgs,
  FindArgs,
  FindUniqueArgs,
  IDatabase,
  ITable,
  UpdateArgs,
} from '../IDatabase.js';

class PostgresTable<T> implements ITable<T> {
  constructor(
    private readonly pool: Pool,
    private readonly table: string
  ) {}

  async create(args: CreateArgs<T>): Promise<T> {
    const data = args.data;
    if (!data || Object.keys(data).length === 0) {
      throw new Error("create requer parâmetro 'data'");
    }

    const keys = Object.keys(data);
    const values = Object.values(data);

    const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');
    const query = `
      INSERT INTO ${this.table} (${keys.join(', ')})
      VALUES (${placeholders})
      RETURNING *
    `;

    const { rows } = await this.pool.query(query, values);

    return rows[0];
  }

  async findMany(args?: FindArgs<T> | undefined): Promise<T[]> {
    const object = args ?? {};
    const where = object.where;

    let query = `SELECT * FROM ${this.table}`;
    const values = [];

    if (where && Object.keys(where).length > 0) {
      const keys = Object.keys(where);
      const conditions = keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');
      query += ` WHERE ${conditions}`;
      values.push(...Object.values(where));
    }

    const { rows } = await this.pool.query(query, values);
    return rows;
  }

  async findUnique(args: FindUniqueArgs<T>): Promise<T | null> {
    const where = args.where;

    if (!where || Object.keys(where).length === 0) throw new Error("findUnique requer parâmetro 'where'");

    const keys = Object.keys(where);
    const values = Object.values(where);

    const conditions = keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');

    const query = `SELECT * FROM ${this.table} WHERE ${conditions} LIMIT 1`;
    const { rows } = await this.pool.query(query, values);

    return rows[0] ?? null;
  }

  async update(args: UpdateArgs<T>): Promise<T> {
    const { where, data } = args;
    if (!where || !data) throw new Error("update requer 'where' e 'data'");

    const setKeys = Object.keys(data);
    const setValues = Object.values(data);

    const setClause = setKeys.map((key, index) => `${key} = $${index + 1}`).join(', ');

    const whereKeys = Object.keys(where);
    const whereValues = Object.values(where);

    const whereClause = whereKeys
      .map((key, index) => `${key} = $${setKeys.length + index + 1}`)
      .join(' AND ');

    const query = `
      UPDATE ${this.table}
      SET ${setClause}
      WHERE ${whereClause}
      RETURNING *
    `;

    const { rows } = await this.pool.query(query, [...setValues, ...whereValues]);
    return rows[0] ?? null;
  }

  async delete(args: DeleteArgs<T>): Promise<T> {
    const { where } = args;
    if (!where) throw new Error("delete requer parâmetro 'where'");

    const keys = Object.keys(where);
    const values = Object.values(where);

    const conditions = keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');

    const query = `DELETE FROM ${this.table} WHERE ${conditions} RETURNING *`;
    const { rows } = await this.pool.query(query, values);

    return rows[0] ?? null;
  }

  async count(args: CountArgs<T>): Promise<number> {
    const where = args.where;

    if (where && Object.keys(where).length > 0) {
      const keys = Object.keys(where);
      const conditions = keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');
      const query = `SELECT COUNT(*) FROM ${this.table} WHERE ${conditions}`;
      const { rows } = await this.pool.query(query, Object.values(where));
      return rows[0].count;
    }

    const query = `SELECT COUNT(*) FROM ${this.table}`;
    const { rows } = await this.pool.query(query);
    return rows[0].count;
  }
}

export class PostgresAdapter implements IDatabase {
  public pool: Pool;

  constructor(config: PoolConfig) {
    this.pool = new Pool(config);
  }

  async connect() {
    await this.pool.query('SELECT 1');
    logger.info('💾 PostgreSQL conectado');
  }

  async disconnect() {
    await this.pool.end();
    logger.info('✅ PostgreSQL desconectado');
  }

  table<T>(name: string): ITable<T> {
    return new PostgresTable<T>(this.pool, name);
  }
}

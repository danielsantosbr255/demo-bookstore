import { Pool } from 'pg';
import IDatabase from '../IDatabase.js';

import logger from '../../../common/utils/logger.js';

export default class PostgresAdapter<T> implements IDatabase<T> {
  private db: Pool;
  public data: T[] = [];
  public model: string;
  public schema: object;

  constructor() {
    this.model = '';
    this.schema = {};
    this.db = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || '5432', 10),
    });
  }

  async create({ data }: { data: T }) {
    this.validateModelAndSchema();
    if (!data) throw new Error("create requer parâmetro 'data'");
    if (Object.keys(data).length === 0) throw new Error("create requer parâmetro 'data'");

    const allowedFields = Object.keys(this.schema).filter(f => f !== 'id');
    this.validateFields(data, allowedFields);

    const keys = Object.keys(data);
    const values = Object.values(data);

    const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');
    const query = `
      INSERT INTO ${this.model} (${keys.join(', ')})
      VALUES (${placeholders})
      RETURNING *
    `;

    const { rows } = await this.db.query(query, values);
    return rows[0] as T;
  }

  async findMany({ where }: { where?: T } = {}) {
    this.validateModelAndSchema();
    const allowedFields = Object.keys(this.schema as object);
    if (where) this.validateFields(where, allowedFields);

    let query = `SELECT * FROM ${this.model}`;
    const values = [];

    if (where && Object.keys(where).length > 0) {
      const keys = Object.keys(where);
      const conditions = keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');
      query += ` WHERE ${conditions}`;
      values.push(...Object.values(where));
    }

    const { rows } = await this.db.query(query, values);
    return rows;
  }

  async findUnique(object: { where?: object }) {
    this.validateModelAndSchema();
    const where = object;
    if (!where || Object.keys(where).length === 0) throw new Error("findUnique requer parâmetro 'where'");

    const allowedFields = Object.keys(this.schema);
    this.validateFields(where, allowedFields);

    const keys = Object.keys(where);
    const values = Object.values(where);

    const conditions = keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');

    const query = `SELECT * FROM ${this.model} WHERE ${conditions} LIMIT 1`;
    const { rows } = await this.db.query(query, values);

    return rows[0] || null;
  }

  async update(object: Partial<{ where: object; data: T }>) {
    this.validateModelAndSchema();
    const { where, data } = object;
    if (!where || !data) throw new Error("update requer 'where' e 'data'");

    const allowedFields = Object.keys(this.schema);
    this.validateFields(where, allowedFields);
    this.validateFields(data, allowedFields);

    const setKeys = Object.keys(data);
    const setValues = Object.values(data);

    const setClause = setKeys.map((key, index) => `${key} = $${index + 1}`).join(', ');

    const whereKeys = Object.keys(where);
    const whereValues = Object.values(where);

    const whereClause = whereKeys
      .map((key, index) => `${key} = $${setKeys.length + index + 1}`)
      .join(' AND ');

    const query = `
      UPDATE ${this.model}
      SET ${setClause}
      WHERE ${whereClause}
      RETURNING *
    `;

    const { rows } = await this.db.query(query, [...setValues, ...whereValues]);
    return rows[0] || null;
  }

  async delete({ where }: { where?: object }) {
    this.validateModelAndSchema();
    if (!where) throw new Error("delete requer parâmetro 'where'");

    const allowedFields = Object.keys(this.schema);
    this.validateFields(where, allowedFields);

    const keys = Object.keys(where);
    const values = Object.values(where);

    const conditions = keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');

    const query = `DELETE FROM ${this.model} WHERE ${conditions} RETURNING *`;
    const { rows } = await this.db.query(query, values);

    return rows[0] || null;
  }

  async count() {
    this.validateModelAndSchema();
    const query = `SELECT COUNT(*) FROM ${this.model}`;
    const { rows } = await this.db.query(query);
    return rows[0].count;
  }

  mapType(type: string) {
    switch (type) {
      case 'number':
        return 'INTEGER';
      case 'string':
        return 'VARCHAR(255)';
      case 'decimal':
        return 'DECIMAL(10,2)';
      case 'boolean':
        return 'BOOLEAN';
      default:
        throw new Error(`Tipo desconhecido: ${type}`);
    }
  }

  private validateModelAndSchema() {
    if (!this.schema || Object.keys(this.schema).length === 0 || !this.model) {
      throw new Error(
        'Modelo ou schema inválidos. Certifique-se de que o modelo e o schema sejam definidos corretamente.'
      );
    }
  }

  validateFields(obj: object, allowedFields: string[]) {
    if (!obj) return;
    for (const key of Object.keys(obj)) {
      if (!allowedFields.includes(key)) {
        throw new Error(
          `Campo inválido "${key}" para a tabela "${this.model}". Campos válidos: ${allowedFields.join(', ')}`
        );
      }
    }
  }

  async connect() {
    try {
      await this.db.connect();
      logger.info('🏦 Database connected!');
    } catch (error) {
      logger.error(error);
    }
  }

  async disconnect() {
    try {
      await this.db.end();
      logger.info('🏦 Database disconnected!');
    } catch (error) {
      logger.error(error);
    }
  }

  getClient() {
    return this.db;
  }
}

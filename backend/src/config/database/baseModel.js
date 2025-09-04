import database from "./database.js";

class BaseModel {
  constructor(tableName, schema) {
    this.db = database.getClient();
    this.tableName = tableName;
    this.schema = schema; // { id: "number", name: "string", ... }
  }

  mapType(type) {
    switch (type) {
      case "number":
        return "INTEGER";
      case "string":
        return "VARCHAR(255)";
      case "decimal":
        return "DECIMAL(10,2)";
      case "boolean":
        return "BOOLEAN";
      default:
        throw new Error(`Tipo desconhecido: ${type}`);
    }
  }

  async sync() {
    const columns = Object.entries(this.schema).map(([key, type]) => {
      if (key === "id") return "id SERIAL PRIMARY KEY";
      return `${key} ${this.mapType(type)} NOT NULL`;
    });

    const query = `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        ${columns.join(",\n        ")}
      );
    `;

    await pool.query(query);
    console.log(`✅ Tabela "${this.tableName}" sincronizada`);
  }

  validateFields(obj, allowedFields) {
    if (!obj) return;
    for (const key of Object.keys(obj)) {
      if (!allowedFields.includes(key)) {
        throw new Error(`Campo inválido "${key}" para a tabela "${this.tableName}". Campos válidos: ${allowedFields.join(", ")}`);
      }
    }
  }

  async findMany({ where } = {}) {
    const allowedFields = Object.keys(this.schema);
    this.validateFields(where, allowedFields);

    let query = `SELECT * FROM ${this.tableName}`;
    const values = [];

    if (where && Object.keys(where).length > 0) {
      const keys = Object.keys(where);
      const conditions = keys.map((key, index) => `${key} = $${index + 1}`).join(" AND ");
      query += ` WHERE ${conditions}`;
      values.push(...Object.values(where));
    }

    const { rows } = await this.db.query(query, values);
    return rows;
  }

  async findUnique({ where }) {
    if (!where) throw new Error("findUnique requer parâmetro 'where'");

    const allowedFields = Object.keys(this.schema);
    this.validateFields(where, allowedFields);

    const keys = Object.keys(where);
    const values = Object.values(where);

    const conditions = keys.map((key, index) => `${key} = $${index + 1}`).join(" AND ");

    const query = `SELECT * FROM ${this.tableName} WHERE ${conditions} LIMIT 1`;
    const { rows } = await this.db.query(query, values);

    return rows[0] || null;
  }

  async create({ data }) {
    if (!data) throw new Error("create requer parâmetro 'data'");

    const allowedFields = Object.keys(this.schema).filter((f) => f !== "id");
    this.validateFields(data, allowedFields);

    const keys = Object.keys(data);
    const values = Object.values(data);

    const placeholders = keys.map((_, index) => `$${index + 1}`).join(", ");
    const query = `
      INSERT INTO ${this.tableName} (${keys.join(", ")})
      VALUES (${placeholders})
      RETURNING *
    `;

    const { rows } = await this.db.query(query, values);
    return rows[0];
  }

  async update({ where, data }) {
    if (!where || !data) {
      throw new Error("update requer 'where' e 'data'");
    }

    const allowedFields = Object.keys(this.schema);
    this.validateFields(where, allowedFields);
    this.validateFields(data, allowedFields);

    const setKeys = Object.keys(data);
    const setValues = Object.values(data);

    const setClause = setKeys.map((key, index) => `${key} = $${index + 1}`).join(", ");

    const whereKeys = Object.keys(where);
    const whereValues = Object.values(where);

    const whereClause = whereKeys.map((key, index) => `${key} = $${setKeys.length + index + 1}`).join(" AND ");

    const query = `
      UPDATE ${this.tableName}
      SET ${setClause}
      WHERE ${whereClause}
      RETURNING *
    `;

    const { rows } = await this.db.query(query, [...setValues, ...whereValues]);
    return rows[0] || null;
  }

  async delete({ where }) {
    if (!where) throw new Error("delete requer parâmetro 'where'");

    const allowedFields = Object.keys(this.schema);
    this.validateFields(where, allowedFields);

    const keys = Object.keys(where);
    const values = Object.values(where);

    const conditions = keys.map((key, index) => `${key} = $${index + 1}`).join(" AND ");

    const query = `DELETE FROM ${this.tableName} WHERE ${conditions} RETURNING *`;
    const { rows } = await this.db.query(query, values);

    return rows[0] || null;
  }
}

export default BaseModel;

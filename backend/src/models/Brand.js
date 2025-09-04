import BaseModel from "../config/database/baseModel.js";

class BrandModel extends BaseModel {
  constructor() {
    super("brands", {
      id: "number",
      name: "string",
      slug: "string",
    });
  }

  async createTable() {
    return this.db.query(`
      CREATE TABLE IF NOT EXISTS brands (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP
      );
    `);
  }
}

export default new BrandModel();

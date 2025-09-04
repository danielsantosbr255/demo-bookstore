import BaseModel from "../config/database/baseModel.js";

class UserModel extends BaseModel {
  constructor() {
    super("users", {
      id: "number",
      name: "string",
      email: "string",
      password: "string",
    });
  }

  createTable() {
    return this.db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP
      )`);
  }
}

export default new UserModel();

import { Pool } from "pg";

class Database {
  constructor() {
    this.db = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
  }

  async connect() {
    try {
      await this.db.connect();
      console.log("🏦 Database connected!");
    } catch (error) {
      console.log(error);
    }
  }

  async disconnect() {
    try {
      await this.db.end();
      console.log("Database disconnected!");
    } catch (error) {
      console.log(error);
    }
  }

  getClient() {
    return this.db;
  }
}

export default new Database();

// process.loadEnvFile();
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const connect = async () => {
  try {
    await pool.connect();
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};

export { pool, connect };

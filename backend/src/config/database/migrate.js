import fs from 'fs';
import path from 'path';
import database from './database.js';

const pool = database.getClient();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function runMigrations() {
  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, 'utf-8');

    console.log(`Running migration: ${file}`);
    await pool.query(sql);
  }

  console.log('✅ All migrations executed successfully!');
  await pool.end();
}

runMigrations().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});

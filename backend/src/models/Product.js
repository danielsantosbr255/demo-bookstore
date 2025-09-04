import db from "../common/database/database.js";

const createTable = () => {
  return db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      description VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      slug VARCHAR(100) UNIQUE NOT NULL,
      brandId INT NOT NULL,
      categoryId INT NOT NULL,      

      FOREIGN KEY (categoryId) REFERENCES categories(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

      FOREIGN KEY (brandId) REFERENCES brands(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP
    )`);
};

export default { createTable };

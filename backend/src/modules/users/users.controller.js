import db from "../../config/database/database.js";

class UserController {
  constructor() {
    this.db = db;
  }

  create = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const userExists = await this.db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const result = await this.db.query(
      `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, email, password]
    );

    res.status(201).json({ message: "User created successfuly!", data: result.rows });
  };

  getAll = async (req, res) => {
    const result = await this.db.query("SELECT * FROM users");
    res.json({ message: "All Users", data: result.rows });
  };

  getOne = async (req, res) => {
    const { id } = req.params;

    const result = await this.db.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json({ message: "User", data: result.rows[0] });
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const result = await this.db.query(
      `
      UPDATE users
      SET name = $1, email = $2, password = $3
      WHERE id = $4
      RETURNING *
      `,
      [name, email, password, id]
    );

    res.json({ message: "User updated successfuly!", data: result.rows[0] });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const result = await this.db.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "User deleted successfuly!", data: result.rows[0] });
  };
}

export default new UserController();

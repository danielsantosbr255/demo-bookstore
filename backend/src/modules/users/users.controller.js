import User from "../../models/User.js";

class UserController {
  create = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const userExists = await User.findUnique({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const createdUser = await User.create({ name, email, password });

    res.status(201).json({ message: "User created successfuly!", data: createdUser });
  };

  getAll = async (req, res) => {
    const users = await User.findMany();
    res.json({ message: "All Users", data: users });
  };

  getOne = async (req, res) => {
    const { id } = req.params;

    const user = await User.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({ message: "User", data: user });
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const updatedUser = await User.update({
      where: { id },
      data: { name, email, password },
    });

    res.json({ message: "User updated successfuly!", data: updatedUser });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const userExists = await User.findUnique({ where: { id } });

    if (!userExists) {
      return res.status(404).json({ message: "User not found!" });
    }

    const user = await User.delete({ id });
    res.json({ message: "User deleted successfuly!", data: user });
  };
}

export default new UserController();

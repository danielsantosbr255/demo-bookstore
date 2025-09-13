import { Request, Response } from 'express';

import { User } from './DTO/User.js';
import UserService from './users.service';

export default class UserController {
  constructor(readonly service: UserService) {}

  create = async (req: Request, res: Response) => {
    const data: User = req.body;
    const { name, email, password } = data;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const userExists = await this.service.getByEmail(email);
    if (userExists) {
      return res.status(409).json({ message: 'User already exists!' });
    }

    const createdUser = await this.service.create({ name, email, password });

    res.status(201).json({ message: 'User created successfuly!', data: createdUser });
  };

  getAll = async (_: Request, res: Response) => {
    const users = await this.service.getMany();
    res.json({ message: 'All Users', data: users });
  };

  getOne = async (req: Request, res: Response) => {
    const params = req.params;

    if (!params.id) return res.status(400).json({ message: 'User ID is required!' });
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid user ID!' });
    }

    const user = await this.service.getOne(id);
    if (!user) return res.status(404).json({ message: 'User not found!' });

    res.json({ message: 'User', data: user });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'User ID is required!' });
    }

    const userId = parseInt(id);
    const data: User = req.body;
    const { name, email, password } = data;

    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID!' });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const user = await this.service.getOne(userId);
    if (!user) return res.status(404).json({ message: 'User not found!' });

    const updatedUser = await this.service.update(userId, { name, email, password });

    res.json({ message: 'User updated successfuly!', data: updatedUser });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'User ID is required!' });
    }

    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID!' });
    }

    const existsUser = await this.service.getOne(userId);
    if (!existsUser) return res.status(404).json({ message: 'User not found!' });

    const user = await this.service.delete(userId);
    res.json({ message: 'User deleted successfuly!', data: user });
  };
}

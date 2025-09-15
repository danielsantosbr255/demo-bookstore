import { Request, Response } from 'express';

import { User } from './dto/User.js';
import UserService from './users.service';

export default class UserController {
  constructor(private readonly service: UserService) {}

  create = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const user = new User(name, email, password);

    const createdUser = await this.service.create(user);

    res.status(201).json({ message: 'User created successfuly!', data: createdUser });
  };

  getAll = async (_: Request, res: Response) => {
    const users = await this.service.getMany();
    res.json({ message: 'All Users', data: users });
  };

  getOne = async (req: Request, res: Response) => {
    const params = req.params;
    if (!params.id) throw new Error('User ID is required!');

    const user = await this.service.getOne(parseInt(params.id));

    res.json({ message: 'User', data: user });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!id) throw new Error('User ID is required!');

    const user = new User(name, email, password);
    const updatedUser = await this.service.update(parseInt(id), user);

    res.json({ message: 'User updated successfuly!', data: updatedUser });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new Error('User ID is required!');

    const user = await this.service.delete(parseInt(id));

    res.json({ message: 'User deleted successfuly!', data: user });
  };
}

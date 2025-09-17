import { Request, Response } from 'express';

import { User } from './dto/User.js';
import UserService from './users.service';

export default class UserController {
  constructor(private readonly service: UserService) {}

  create = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const user = User.create(name, email, password);
    const createdUser = await this.service.create(user);

    res.status(201).json({ message: 'User created successfuly!', data: createdUser.name });
  };

  getAll = async (_: Request, res: Response) => {
    const users = await this.service.getMany();
    res.json({
      message: 'All Users',
      data: users.map(user => ({ id: user.id, name: user.name, email: user.email })),
    });
  };

  getOne = async (req: Request, res: Response) => {
    const params = req.params;
    if (!params.id) throw new Error('User ID is required!');

    const id = params.id === 'me' && req.userId ? req.userId : parseInt(params.id);
    if (isNaN(id)) throw new Error('User ID must be a valid number!');

    const user = await this.service.getOne(id);
    res.json({ message: 'User', data: { ...user, password: undefined } });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    if (!id) throw new Error('User ID is required!');

    const userId = parseInt(id);
    if (isNaN(userId)) throw new Error('User ID must be a valid number!');

    const user = User.update(req.body);
    const updatedUser = await this.service.update(userId, user);

    res.json({ message: 'User updated successfuly!', data: updatedUser });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new Error('User ID is required!');

    const userId = parseInt(id);
    if (isNaN(userId)) throw new Error('User ID must be a valid number!');

    const user = await this.service.delete(userId);

    res.json({ message: 'User deleted successfuly!', data: user });
  };
}

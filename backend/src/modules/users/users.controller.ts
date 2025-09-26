import { CustomError } from '@/common/utils/CustomError';
import type { Request, Response } from 'express';
import UserService from './users.service';

export default class UserController {
  constructor(private readonly service: UserService) {}

  create = async (req: Request, res: Response) => {
    const createdUser = await this.service.create(req.body);
    res.status(201).json({ message: 'User created successfuly!', data: createdUser });
  };

  getAll = async (_: Request, res: Response) => {
    const users = await this.service.getMany();
    res.json({ message: 'All Users', data: users });
  };

  getOne = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    if (!id) throw new CustomError('User ID is required!', 400);

    const user = await this.service.getOne(id);
    res.json({ message: 'User', data: user });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const updatedUser = await this.service.update(id, req.body);

    res.json({ message: 'User updated successfuly!', data: updatedUser });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new CustomError('User ID is required!', 400);

    await this.service.delete(id);

    res.json({ message: 'User deleted successfuly!', data: id });
  };
}

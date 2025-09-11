import { Request, Response } from 'express';

import { UserCreate, UserUpdate } from './DTO/UsersDTO.js';
import UsersService from './users.service.js';

export default class UserController {
  private service: UsersService;

  constructor(service: UsersService) {
    this.service = service;
  }

  create = async (req: Request, res: Response) => {
    const data: UserCreate = req.body;
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
    const { id } = req.params;

    const user = await this.service.getOne(id);
    if (!user) return res.status(404).json({ message: 'User not found!' });

    res.json({ message: 'User', data: user });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: UserUpdate = req.body;
    const { name, email, password } = data;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const user = await this.service.getOne(id);
    if (!user) return res.status(404).json({ message: 'User not found!' });

    const updatedUser = await this.service.update(id, { name, email, password });

    res.json({ message: 'User updated successfuly!', data: updatedUser });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const existsUser = await this.service.getOne(id);
    if (!existsUser) return res.status(404).json({ message: 'User not found!' });

    const user = await this.service.delete(id);
    res.json({ message: 'User deleted successfuly!', data: user });
  };
}

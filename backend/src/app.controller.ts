import { Request, Response } from 'express';

export class AppController {
  getHello = (_: Request, res: Response) => {
    res.status(200).json({ message: 'Hello, world!' });
  };
}

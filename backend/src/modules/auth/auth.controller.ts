import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

export class AuthController {
  constructor(private readonly service: AuthService) {}

  signUp = async (req: Request, res: Response) => {
    const user = AuthDTO.signUp(req.body);
    const createdUser = await this.service.signUp(user);

    res.status(201).json({ message: 'User created successfuly!', data: createdUser });
  };

  signIn = async (req: Request, res: Response) => {
    const user = AuthDTO.signIn(req.body);
    const userLogged = await this.service.signIn(user);

    res.cookie('userId', userLogged.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: 'User logged successfuly!', data: userLogged.name });
  };

  signOut = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const user = this.service.signOut({ id: parseInt(id) });

    res.clearCookie('userId');

    res.json({ message: 'User logged out successfuly!', data: user });
  };
}

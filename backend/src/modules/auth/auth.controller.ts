import { getClientIp } from '@/common/utils/getClientIp';
import { config } from '@/core/config';
import { Request, Response } from 'express';
import { SessionsService } from '../sessions/sessions.service';
import { signInSchema, signOutSchema } from './auth.dto';
import { AuthService } from './auth.service';

export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly sessionsService: SessionsService
  ) {}

  signUp = async (req: Request, res: Response) => {
    const createdUser = await this.service.signUp(req.body);
    res.status(201).json({ message: 'User created successfuly!', data: createdUser });
  };

  signIn = async (req: Request, res: Response) => {
    const { email, password } = signInSchema.parse(req.body);
    const userLogged = await this.service.signIn({ email, password });

    const user_agent = req.headers['user-agent'] ?? 'Desconhecido';
    const user_id = userLogged.id;
    const ip = getClientIp(req);

    const createdSession = await this.sessionsService.create({ user_id, user_agent, ip });

    res.cookie('sessionId', createdSession.id, {
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: 'User logged successfuly!',
      data: createdSession,
    });
  };

  signOut = async (req: Request, res: Response) => {
    const { session_id, user_id } = signOutSchema.parse({
      session_id: req.cookies.sessionId,
      user_id: req.user_id,
    });

    await this.sessionsService.deleteByUserId(session_id, user_id);

    res.clearCookie('sessionId');
    res.json({ message: 'User logged out successfuly!', data: session_id });
  };
}

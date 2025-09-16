import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/CustomError';
// import { getUserAgent } from '../utils/user-agent.util';

// [TODO]
export const AuthGuard = async (req: Request, _: Response, next: NextFunction) => {
  const token = req.cookies.userId;

  if (!token) throw new CustomError('Acesso negado!', 401);
  req.userId = token;

  // const user = { id: req.session.userId, browser: req.session.browser };

  // const userAgent = req.headers['user-agent'] ?? 'Desconhecido';
  // const ua = getUserAgent(userAgent);

  // if (ua.browser !== req.session.browser) {
  //   console.error('❌ Context not match.');
  //   throw new CustomError('Acesso negado!', 401);
  // }

  next();
};

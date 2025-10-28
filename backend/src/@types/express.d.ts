import { ISession } from '@/modules/sessions/sessions.dto';
import 'express';

declare global {
  namespace Express {
    interface Request {
      session: ISession;
      user_id?: string;
    }
  }
}

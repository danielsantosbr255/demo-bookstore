declare global {
  namespace Express {
    interface Request {
      session: {
        userId: number;
        browser: string;
      };

      userId?: number;
    }
  }
}

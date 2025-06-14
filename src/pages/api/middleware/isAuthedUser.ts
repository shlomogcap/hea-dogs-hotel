import admin from '@/lib/firebase/admin';
import { Middleware, NextFunction } from './handler';
import nookies from 'nookies';

export const isAuthedUser =
  (): Middleware =>
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    try {
      const { token } = nookies.get({ req });
      const tokenFromHeaders = req.headers.authorization?.split(' ')[1];
      const authedUser = await admin
        .auth()
        .verifyIdToken(token ?? tokenFromHeaders);
      req.authedUser = authedUser;
      req.authedUsertoken = token;
      next();
    } catch (err) {
      res.status(401).json({
        success: false,
        message: `Unauthorized user`,
      });
    }
  };

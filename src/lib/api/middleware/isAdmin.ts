import { Middleware, NextFunction } from './handler';

const getAdminUids = (): string[] =>
  (process.env.ADMIN_UIDS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

export const isAdmin =
  (): Middleware =>
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const uid = req.authedUser?.uid;
    const adminUids = getAdminUids();
    if (uid && adminUids.length > 0 && adminUids.includes(uid)) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
  };

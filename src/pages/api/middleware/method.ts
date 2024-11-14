import { Middleware, NextFunction } from './handler';

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export const methodsGuard =
  (allowedMethods: HttpMethod[]): Middleware =>
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    if (allowedMethods.includes(req.method as HttpMethod)) {
      next();
    } else {
      res.status(405).json({
        success: false,
        message: `Endpoint does not support requests of type '${req.method}'.`,
      });
    }
  };

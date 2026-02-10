import { handler } from '../middleware/handler';
import { HttpMethod, methodsGuard } from '../middleware/method';
import { isAuthedUser } from '../middleware/isAuthedUser';
import { isAdmin } from '../middleware/isAdmin';

type Data =
  | { success: true; isAdmin: true }
  | { success: false; message: string };

const checkAdmin = async (_req: NextApiRequest, res: NextApiResponse<Data>) => {
  return res.status(200).json({ success: true, isAdmin: true });
};

export default handler(
  methodsGuard([HttpMethod.Get]),
  isAuthedUser(),
  isAdmin(),
  checkAdmin,
);

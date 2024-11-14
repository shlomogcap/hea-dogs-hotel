import { handler } from './middleware/handler';
import { HttpMethod, methodsGuard } from './middleware/method';

type Data = {
  message: string;
};

const hello = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ message: 'Hello John Doe' });
};

export default handler(methodsGuard([HttpMethod.Get]), hello);

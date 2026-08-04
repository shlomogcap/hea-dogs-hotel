import nookies from 'nookies';
import { HttpMethod, methodsGuard } from '@/lib/api/middleware/method';
import { handler } from '@/lib/api/middleware/handler';
import { isAuthedUser } from '@/lib/api/middleware/isAuthedUser';

type CookiesData = {
  [key: string]: string;
};

type Data = {
  data: CookiesData;
};

const getCookies = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const cookiesData = nookies.get({ req });
  res.status(200).json({ data: cookiesData });
};

export default handler(
  methodsGuard([HttpMethod.Get]),
  isAuthedUser(),
  getCookies,
);

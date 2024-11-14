import axios from 'axios';
import { getAbsoluteApiPath } from './_utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await axios.get(getAbsoluteApiPath(req, 'hello'));
  res.status(200).json({
    result: result.data,
  });
}

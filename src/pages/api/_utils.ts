import { PROTOCOL_HEADER } from './_consts';

export const getAbsoluteApiPath = ({ headers }: NextApiRequest, path: string) =>
  `${headers[PROTOCOL_HEADER]}://${headers.host}/api/${path}`;

export const getAuthorizationHeader = (req: NextApiRequest) => ({
  Authorization: `Bearer ${req.authedUsertoken}`,
});

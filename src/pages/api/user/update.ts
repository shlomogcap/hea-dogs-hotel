import { auth } from 'firebase-admin';
import { FirebaseError } from 'firebase/app';
import { handler } from '../middleware/handler';
import { HttpMethod, methodsGuard } from '../middleware/method';
import { isAuthedUser } from '../middleware/isAuthedUser';
import { UpdateRequest } from 'firebase-admin/lib/auth/auth-config';

type Data = {
  success: boolean;
  message?: string;
  info?: object;
};

const updateUser = async (
  req: NextApiRequest<UpdateRequest>,
  res: NextApiResponse<Data>,
) => {
  try {
    const uid = req.authedUser?.uid;
    if (!uid) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    await auth().updateUser(uid, req.body);
    return res.status(200).json({
      success: true,
      message: 'user data updated',
    });
  } catch (err) {
    const isFirebaseError = err instanceof FirebaseError;
    res.status(400).json({
      success: false,
      message: isFirebaseError ? err.message : 'Unexpected Error',
      info: isFirebaseError ? err : {},
    });
  }
};

export default handler(
  methodsGuard([HttpMethod.Patch]),
  isAuthedUser(),
  updateUser,
);

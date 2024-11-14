import { ECommonFields } from '@/lib/consts/commonFields';
import { EUserFields } from '@/lib/consts/users';
import dayjs from 'dayjs';
import { auth, firestore } from 'firebase-admin';
import { FirebaseError } from 'firebase/app';
import nookies from 'nookies';
import { handler } from '../middleware/handler';
import { HttpMethod, methodsGuard } from '../middleware/method';
import { isAuthedUser } from '../middleware/isAuthedUser';

type Data = {
  success: boolean;
  message?: string;
  info?: object;
};

const cloneAuthUsers = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  try {
    const { token } = nookies.get({ req });
    const verifiedAuthUser = await auth().verifyIdToken(token);
    const usersQuery = await auth().listUsers();
    const preparedUsers = usersQuery.users.map((userData) => ({
      [ECommonFields.Id]: userData.uid,
      [EUserFields.Title]: userData.displayName ?? '',
      [EUserFields.Phone]: userData.phoneNumber ?? '',
      [EUserFields.Email]: userData.email ?? '',
      [ECommonFields.UpdatedBy]: verifiedAuthUser.uid,
      [ECommonFields.UpdatedAt]: dayjs().toISOString(),
    }));
    const batch = firestore().batch();
    preparedUsers.forEach(({ id, ...userData }) => {
      const docRef = firestore().doc(`users/${id}`);
      batch.set(docRef, userData, { merge: true });
    });
    const writes = await batch.commit();
    const totalWrites = writes.length;
    return res.status(totalWrites ? 201 : 200).json({
      success: true,
      message: totalWrites ? `${totalWrites} users added` : 'no data added',
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
  methodsGuard([HttpMethod.Post]),
  isAuthedUser(),
  cloneAuthUsers,
);

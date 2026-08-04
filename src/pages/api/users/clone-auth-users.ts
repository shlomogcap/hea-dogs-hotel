import { ECommonFields } from '@/lib/consts/commonFields';
import { EUserFields } from '@/lib/consts/users';
import dayjs from 'dayjs';
import admin from '@/lib/firebase/admin';
import type { UserRecord } from 'firebase-admin/auth';
import { FirebaseError } from 'firebase/app';
import nookies from 'nookies';
import { handler } from '@/lib/api/middleware/handler';
import { HttpMethod, methodsGuard } from '@/lib/api/middleware/method';
import { isAuthedUser } from '@/lib/api/middleware/isAuthedUser';

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
    const verifiedAuthUser = await admin.auth().verifyIdToken(token);
    const usersQuery = await admin.auth().listUsers();
    const preparedUsers = usersQuery.users.map((userData: UserRecord) => ({
      [ECommonFields.Id]: userData.uid,
      [EUserFields.Name]: userData.displayName ?? '',
      [EUserFields.Phone]: userData.phoneNumber ?? '',
      [EUserFields.Email]: userData.email ?? '',
      [ECommonFields.UpdatedBy]: verifiedAuthUser.uid,
      [ECommonFields.UpdatedAt]: dayjs().toISOString(),
    }));
    const batch = admin.firestore().batch();
    preparedUsers.forEach(
      ({ id, ...userData }: (typeof preparedUsers)[number]) => {
        const docRef = admin.firestore().doc(`users/${id}`);
        batch.set(docRef, userData, { merge: true });
      },
    );
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

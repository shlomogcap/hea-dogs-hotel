import { FirebaseError } from 'firebase/app';
import { handler } from '../middleware/handler';
import { HttpMethod, methodsGuard } from '../middleware/method';
import { isAuthedUser } from '../middleware/isAuthedUser';
import { firestore } from '@/lib/firebase';
import { collection, writeBatch, doc } from 'firebase/firestore';
import { WithId } from '../_utils';
import { uuid } from '@/lib/utils/uuid';

export type IDogDoc = WithId<{
  dogId: string;
  dogName: string;
  dogGender: string;
  dogBread: string;
  dogAge: string;
  dogPhysicalDescription: string;
}>;

export type CreateDogsBody = IDogDoc[];

type Data = {
  success: boolean;
  message?: string;
  info?: object;
};

const createDog = async (
  req: NextApiRequest<CreateDogsBody>,
  res: NextApiResponse<Data>,
) => {
  try {
    const batch = writeBatch(firestore);
    const dogsCol = collection(
      firestore,
      `/workspace/${req.authedUser?.uid}/dogs`,
    );
    const requestWithIds = req.body.map((dogData) => ({
      ...dogData,
      dogId: dogData.dogId ?? uuid(),
    }));
    for (const dogData of requestWithIds) {
      const dogsDoc = doc(dogsCol, dogData.dogId);
      batch.set(dogsDoc, dogData);
    }
    await batch.commit();
    return res.status(200).json({
      success: true,
      message: 'dogs created',
      info: { ids: requestWithIds.map((d) => d.dogId) },
    });
  } catch (err) {
    const isFirebaseError = err instanceof FirebaseError;
    return res.status(400).json({
      success: false,
      message: isFirebaseError ? err.message : 'Unexpected Error',
      info: isFirebaseError ? err : {},
    });
  }
};

export default handler(
  methodsGuard([HttpMethod.Post]),
  isAuthedUser(),
  createDog,
);

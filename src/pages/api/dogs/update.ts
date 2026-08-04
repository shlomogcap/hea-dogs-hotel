import { FirebaseError } from 'firebase/app';
import { handler } from '@/lib/api/middleware/handler';
import { HttpMethod, methodsGuard } from '@/lib/api/middleware/method';
import { isAuthedUser } from '@/lib/api/middleware/isAuthedUser';
import { firestore } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { IDogDoc } from '@/pages/api/dogs/create';

export type UpdateDogBody = Omit<IDogDoc, 'id'>;

type Data = {
  success: boolean;
  message?: string;
  info?: object;
};

const updateDog = async (
  req: NextApiRequest<UpdateDogBody>,
  res: NextApiResponse<Data>,
) => {
  try {
    const { dogId } = req.body;
    if (!dogId) {
      return res.status(400).json({
        success: false,
        message: 'dogId is required',
      });
    }
    const dogRef = doc(
      firestore,
      `/workspace/${req.authedUser?.uid}/dogs/${dogId}`,
    );
    await updateDoc(dogRef, req.body);
    return res.status(200).json({
      success: true,
      message: 'dog updated',
      info: { dogId },
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
  methodsGuard([HttpMethod.Patch]),
  isAuthedUser(),
  updateDog,
);

import { FirebaseError } from 'firebase/app';
import { handler } from '../middleware/handler';
import { HttpMethod, methodsGuard } from '../middleware/method';
import { isAuthedUser } from '../middleware/isAuthedUser';
import { firestore } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';

export type CreateInvitationBody = {
  ownerName: string;
  ownerId: string;
  phone: string;
  email: string;
  startDate: string;
  endDate: string;
  sHour: string;
  eHour: string;
  dogName: string;
  dogGender: string;
  dogBread: string;
  dogAge: string;
  dogPhysicalDescription: string;
};

type Data = {
  success: boolean;
  message?: string;
  info?: object;
};

const createInvitation = async (
  req: NextApiRequest<CreateInvitationBody>,
  res: NextApiResponse<Data>,
) => {
  try {
    const col = collection(firestore, `/${req.authedUser?.uid}/invitations`);
    const result = await addDoc(col, req.body);
    return res.status(200).json({
      success: true,
      message: 'invitation created',
      info: {
        id: result.id,
      },
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
  createInvitation,
);

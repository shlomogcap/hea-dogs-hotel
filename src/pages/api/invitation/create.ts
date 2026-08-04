import { FirebaseError } from 'firebase/app';
import { handler } from '@/lib/api/middleware/handler';
import { HttpMethod, methodsGuard } from '@/lib/api/middleware/method';
import { isAuthedUser } from '@/lib/api/middleware/isAuthedUser';
import { firestore } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { WithId } from '@/lib/api/utils';
import { IDogDoc } from '../dogs/create';

export type InvitationStatus =
  | 'draft'
  | 'send_for_confirmation'
  | 'confirmed'
  | 'canceled'
  | 'done';

export type IInvitationDoc = WithId<{
  ownerName: string;
  ownerId: string;
  phone: string;
  email: string;
  status: InvitationStatus;
  startDate: string;
  endDate: string;
  sHour: string;
  eHour: string;
  dogs: IDogDoc[];
}>;

export type CreateInvitationBody = IInvitationDoc;

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
    const invitationsCol = collection(
      firestore,
      `/workspace/${req.authedUser?.uid}/invitations`,
    );
    const body = {
      ...req.body,
      status: req.body.status ?? 'draft',
    };
    const result = await addDoc(invitationsCol, body);
    return res.status(200).json({
      success: true,
      message: 'invitation created',
      info: {
        id: result.id,
      },
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
  createInvitation,
);

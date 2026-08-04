import { FirebaseError } from 'firebase/app';
import { handler } from '@/lib/api/middleware/handler';
import { HttpMethod, methodsGuard } from '@/lib/api/middleware/method';
import { isAuthedUser } from '@/lib/api/middleware/isAuthedUser';
import { firestore } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { InvitationStatus } from './create';

export type UpdateInvitationStatusBody = {
  id: string;
  status: InvitationStatus;
};

const VALID_STATUSES: InvitationStatus[] = [
  'draft',
  'send_for_confirmation',
  'confirmed',
  'canceled',
  'done',
];

type Data = {
  success: boolean;
  message?: string;
  info?: object;
};

const updateInvitationStatus = async (
  req: NextApiRequest<UpdateInvitationStatusBody>,
  res: NextApiResponse<Data>,
) => {
  try {
    const { id, status } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'id is required',
      });
    }
    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `status must be one of: ${VALID_STATUSES.join(', ')}`,
      });
    }
    const invRef = doc(
      firestore,
      `/workspace/${req.authedUser?.uid}/invitations/${id}`,
    );
    await updateDoc(invRef, { status });
    return res.status(200).json({
      success: true,
      message: 'invitation status updated',
      info: { id, status },
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
  updateInvitationStatus,
);

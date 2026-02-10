import { FirebaseError } from 'firebase/app';
import { handler } from '../../middleware/handler';
import { HttpMethod, methodsGuard } from '../../middleware/method';
import { isAuthedUser } from '../../middleware/isAuthedUser';
import { isAdmin } from '../../middleware/isAdmin';
import admin from '@/lib/firebase/admin';
import { InvitationStatus } from '../../invitation/create';

const VALID_STATUSES: InvitationStatus[] = [
  'draft',
  'send_for_confirmation',
  'confirmed',
  'canceled',
  'done',
];

export type AdminUpdateInvitationStatusBody = {
  id: string;
  ownerId: string;
  status: InvitationStatus;
};

type Data = {
  success: boolean;
  message?: string;
  info?: object;
};

const updateStatus = async (
  req: NextApiRequest<AdminUpdateInvitationStatusBody>,
  res: NextApiResponse<Data>,
) => {
  try {
    const { id, ownerId, status } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'id is required',
      });
    }
    if (!ownerId) {
      return res.status(400).json({
        success: false,
        message: 'ownerId is required',
      });
    }
    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `status must be one of: ${VALID_STATUSES.join(', ')}`,
      });
    }
    const db = admin.firestore();
    const invRef = db.doc(`workspace/${ownerId}/invitations/${id}`);
    await invRef.update({ status });
    return res.status(200).json({
      success: true,
      message: 'invitation status updated',
      info: { id, ownerId, status },
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
  isAdmin(),
  updateStatus,
);

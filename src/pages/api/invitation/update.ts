import { FirebaseError } from 'firebase/app';
import { handler } from '../middleware/handler';
import { HttpMethod, methodsGuard } from '../middleware/method';
import { isAuthedUser } from '../middleware/isAuthedUser';
import { firestore } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { IInvitationDoc } from './create';

export type UpdateInvitationBody = Partial<Omit<IInvitationDoc, 'id'>> & {
  id: string;
};

type Data = {
  success: boolean;
  message?: string;
  info?: object;
};

const updateInvitation = async (
  req: NextApiRequest<UpdateInvitationBody>,
  res: NextApiResponse<Data>,
) => {
  try {
    const { id, ...updates } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'id is required',
      });
    }
    const invRef = doc(
      firestore,
      `/workspace/${req.authedUser?.uid}/invitations/${id}`,
    );
    // User editing invitation resets status to draft (admin can use update-status for transitions)
    const payload = { ...updates, status: 'draft' };
    await updateDoc(invRef, payload);
    return res.status(200).json({
      success: true,
      message: 'invitation updated',
      info: { id },
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
  updateInvitation,
);

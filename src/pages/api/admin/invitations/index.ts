import { handler } from '../../middleware/handler';
import { HttpMethod, methodsGuard } from '../../middleware/method';
import { isAuthedUser } from '../../middleware/isAuthedUser';
import { isAdmin } from '../../middleware/isAdmin';
import admin from '@/lib/firebase/admin';
import { IInvitationDoc } from '../../invitation/create';

export type AdminInvitationItem = IInvitationDoc & { ownerId: string };

type Data =
  | { success: true; invitations: AdminInvitationItem[] }
  | { success: false; message: string };

const listInvitations = async (
  _req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collectionGroup('invitations').get();
    const invitations: AdminInvitationItem[] = snapshot.docs.map((docSnap) => {
      const pathSegments = docSnap.ref.path.split('/');
      const ownerId = pathSegments[pathSegments.length - 3];
      const id = docSnap.id;
      const data = docSnap.data() as Omit<IInvitationDoc, 'id'>;
      return {
        ...data,
        id,
        ownerId,
      } as AdminInvitationItem;
    });
    return res.status(200).json({ success: true, invitations });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : 'Unexpected error',
    });
  }
};

export default handler(
  methodsGuard([HttpMethod.Get]),
  isAuthedUser(),
  isAdmin(),
  listInvitations,
);

import { handler } from '@/lib/api/middleware/handler';
import { HttpMethod, methodsGuard } from '@/lib/api/middleware/method';
import { isAuthedUser } from '@/lib/api/middleware/isAuthedUser';
import { isAdmin } from '@/lib/api/middleware/isAdmin';
import admin from '@/lib/firebase/admin';
import { IDogDoc } from '../../dogs/create';

export type AdminDogItem = IDogDoc & { ownerId: string };

type Data =
  | { success: true; dogs: AdminDogItem[] }
  | { success: false; message: string };

const listDogs = async (_req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collectionGroup('dogs').get();
    const dogs: AdminDogItem[] = snapshot.docs.map((docSnap) => {
      const pathSegments = docSnap.ref.path.split('/');
      const ownerId = pathSegments[pathSegments.length - 3];
      const id = docSnap.id;
      const data = docSnap.data() as Omit<IDogDoc, 'id'>;
      return {
        ...data,
        id,
        ownerId,
      } as AdminDogItem;
    });
    return res.status(200).json({ success: true, dogs });
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
  listDogs,
);

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { firestore } from '@firebase';
import { collectionGroup } from 'firebase/firestore';
import type { DocumentSnapshot } from 'firebase/firestore';
import type { AdminInvitationItem } from '@/pages/api/admin/invitations';
import { onSnapshotHandler } from '../utils/onSnapshotHandler';

type IAdminInvitationsContext = {
  data: AdminInvitationItem[];
  isLoading: boolean;
  error: string;
  accessDenied: boolean;
};

const AdminInvitationsContext = createContext<IAdminInvitationsContext>({
  data: [],
  isLoading: false,
  error: '',
  accessDenied: false,
});

export const useAdminInvitationsContext = () =>
  useContext(AdminInvitationsContext);

const docToAdminItem = (doc: DocumentSnapshot): AdminInvitationItem => {
  const pathSegments = doc.ref.path.split('/');
  const ownerId = pathSegments[pathSegments.length - 3];
  const id = doc.id;
  const data = doc.data() as Omit<AdminInvitationItem, 'id' | 'ownerId'>;
  return { ...data, id, ownerId } as AdminInvitationItem;
};

const rowKey = (item: AdminInvitationItem) => `${item.ownerId}_${item.id}`;

export const AdminInvitationsProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<AdminInvitationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const init = async () => {
      setIsLoading(true);
      setAccessDenied(false);
      try {
        const res = await fetch('/api/admin/invitations', {
          credentials: 'include',
        });
        if (res.status === 403) {
          setAccessDenied(true);
          setData([]);
          setError('');
          setIsLoading(false);
          return;
        }
        if (!res.ok) {
          setData([]);
          setError('Failed to load');
          setIsLoading(false);
          return;
        }
        setError('');
        const query = collectionGroup(firestore, 'invitations');
        unsubscribe = onSnapshotHandler<AdminInvitationItem>({
          queryRef: query,
          setIsLoading,
          setData,
          setError,
          mapDoc: docToAdminItem,
          getRowKey: rowKey,
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unexpected error');
        setIsLoading(false);
      }
    };

    init();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <AdminInvitationsContext.Provider
      value={{ data, isLoading, error, accessDenied }}
    >
      {children}
    </AdminInvitationsContext.Provider>
  );
};

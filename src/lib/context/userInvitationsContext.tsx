import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, firestore } from '@firebase';
import { collection } from 'firebase/firestore';
import { IInvitationDoc } from '../../pages/api/invitation/create';
import { onSnapshotHandler } from '../utils/onSnapshotHandler';

type IInvitationsContext = {
  data: IInvitationDoc[];
  isLoading: boolean;
  error: string;
};

type IInvitationsProviderProps = object;

const InvitationsContext = createContext<IInvitationsContext>({
  data: [],
  isLoading: false,
  error: '',
});

export const useInvitationsContext = () => useContext(InvitationsContext);

export const InvitationsProvider = ({
  children,
}: PropsWithChildren<IInvitationsProviderProps>) => {
  const [data, setData] = useState<IInvitationDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const collectionRef = collection(
      firestore,
      `/workspace/${auth?.currentUser?.uid}/invitations`,
    );

    const unsubscribe = onSnapshotHandler({
      collectionRef,
      setIsLoading,
      setData,
      setError,
    });

    return () => unsubscribe();
  }, []);

  return (
    <InvitationsContext.Provider value={{ data, isLoading, error }}>
      {children}
    </InvitationsContext.Provider>
  );
};

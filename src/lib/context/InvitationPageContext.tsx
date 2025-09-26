import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, firestore } from '@firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { IInvitationDoc } from '../../pages/api/invitation/create';
import { onSnapshotHandler } from '../utils/onSnapshotHandler';

type IData = {
  invitations: IInvitationDoc[];
  currentInvitation: IInvitationDoc;
};

type IInvitationContext = {
  data: IData;
  isLoading: boolean;
  error: string;
};

type IInvitationsProviderProps = {
  invitationId: string;
};

const InvitationPageContext = createContext<IInvitationContext>({
  data: {
    invitations: [] as IInvitationDoc[],
    currentInvitation: {} as IInvitationDoc,
  },
  isLoading: false,
  error: '',
});

export const useInvitationPageContext = () => useContext(InvitationPageContext);

export const InvitationPageProvider = ({
  invitationId,
  children,
}: PropsWithChildren<IInvitationsProviderProps>) => {
  const [currentInvitation, setCurrentInvitation] = useState<IInvitationDoc>(
    {} as IInvitationDoc,
  );
  const [otherInvitationsData, setOtherInvitationsData] = useState<
    IInvitationDoc[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const currentInvitationSubscription = onSnapshot(
      doc(
        firestore,
        `/workspace/${auth?.currentUser?.uid}/invitations/${invitationId}`,
      ),
      (snapshot) => {
        if (!snapshot.exists()) {
          setCurrentInvitation({} as IInvitationDoc);
        } else {
          setCurrentInvitation({
            ...(snapshot.data() as IInvitationDoc),
            id: snapshot.id,
          });
        }
      },
    );
    const collectionRef = collection(
      firestore,
      `/workspace/${auth?.currentUser?.uid}/invitations`,
    );

    const otherInvitationsSubscription = onSnapshotHandler({
      collectionRef,
      setIsLoading,
      setData: setOtherInvitationsData,
      setError,
    });

    return () =>
      [currentInvitationSubscription, otherInvitationsSubscription].forEach(
        (unsubscribe) => unsubscribe(),
      );
  }, [invitationId]);

  return (
    <InvitationPageContext.Provider
      value={{
        data: { invitations: otherInvitationsData, currentInvitation },
        isLoading,
        error,
      }}
    >
      {children}
    </InvitationPageContext.Provider>
  );
};

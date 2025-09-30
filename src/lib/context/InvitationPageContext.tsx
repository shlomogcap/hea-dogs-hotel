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
import { IDogDoc } from '@/pages/api/dogs/create';

type IData = {
  dogs: IDogDoc[];
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
    dogs: [] as IDogDoc[],
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
  const [dogs, setDogs] = useState<IDogDoc[]>([]);
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
    const invitationsCollectionRef = collection(
      firestore,
      `/workspace/${auth?.currentUser?.uid}/invitations`,
    );

    const otherInvitationsSubscription = onSnapshotHandler({
      collectionRef: invitationsCollectionRef,
      setIsLoading,
      setData: setOtherInvitationsData,
      setError,
    });

    const dogsCollectionRef = collection(
      firestore,
      `/workspace/${auth?.currentUser?.uid}/dogs`,
    );

    const dogsSubscription = onSnapshotHandler({
      collectionRef: dogsCollectionRef,
      setIsLoading,
      setData: setDogs,
      setError,
    });

    return () =>
      [
        currentInvitationSubscription,
        otherInvitationsSubscription,
        dogsSubscription,
      ].forEach((unsubscribe) => unsubscribe());
  }, [invitationId]);

  return (
    <InvitationPageContext.Provider
      value={{
        data: { invitations: otherInvitationsData, currentInvitation, dogs },
        isLoading,
        error,
      }}
    >
      {children}
    </InvitationPageContext.Provider>
  );
};

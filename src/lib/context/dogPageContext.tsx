import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, firestore } from '@firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { IDogDoc } from '@/pages/api/dogs/create';

type IData = {
  currentDog: IDogDoc;
};

type IDogPageContext = {
  data: IData;
  isLoading: boolean;
  error: string;
};

type IDogPagesProviderProps = {
  dogId: string;
};

const DogPageContext = createContext<IDogPageContext>({
  data: {
    currentDog: {} as IDogDoc,
  },
  isLoading: false,
  error: '',
});

export const useDogPageContext = () => useContext(DogPageContext);

export const DogPageProvider = ({
  dogId,
  children,
}: PropsWithChildren<IDogPagesProviderProps>) => {
  const [currentDog, setCurrentDog] = useState<IDogDoc>({} as IDogDoc);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const currentDogSubscription = onSnapshot(
      doc(firestore, `/workspace/${auth?.currentUser?.uid}/dogs/${dogId}`),
      (snapshot) => {
        setIsLoading(true);
        if (!snapshot.exists()) {
          setCurrentDog({} as IDogDoc);
          setIsLoading(false);
          setError('');
        } else {
          setCurrentDog({
            ...(snapshot.data() as IDogDoc),
            id: snapshot.id,
          });
          setIsLoading(false);
          setError('');
        }
      },
    );

    return () =>
      [currentDogSubscription].forEach((unsubscribe) => unsubscribe());
  }, [dogId]);

  return (
    <DogPageContext.Provider
      value={{
        data: { currentDog },
        isLoading,
        error,
      }}
    >
      {children}
    </DogPageContext.Provider>
  );
};

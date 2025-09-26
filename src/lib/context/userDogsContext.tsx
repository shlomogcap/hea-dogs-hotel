import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, firestore } from '@firebase';
import { collection } from 'firebase/firestore';
import { IDogDoc } from '../../pages/api/invitation/create';
import { onSnapshotHandler } from '../utils/onSnapshotHandler';

type IDogsContext = {
  data: IDogDoc[];
  isLoading: boolean;
  error: string;
};

type IDogsProviderProps = object;

const DogsContext = createContext<IDogsContext>({
  data: [],
  isLoading: false,
  error: '',
});

export const useDogsContext = () => useContext(DogsContext);

export const DogsProvider = ({
  children,
}: PropsWithChildren<IDogsProviderProps>) => {
  const [data, setData] = useState<IDogDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const collectionRef = collection(
      firestore,
      `/workspace/${auth?.currentUser?.uid}/dogs`,
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
    <DogsContext.Provider value={{ data, isLoading, error }}>
      {children}
    </DogsContext.Provider>
  );
};

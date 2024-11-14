import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { firestore } from '@firebase';
import { collection } from 'firebase/firestore';
import { IUserDoc } from '../consts/users';
import { onSnapshotHandler } from '../utils/onSnapshotHandler';

type IUsersContext = {
  data: IUserDoc[];
  isLoading: boolean;
  error: string;
};

type IUsersProviderProps = object;

const UsersContext = createContext<IUsersContext>({
  data: [],
  isLoading: false,
  error: '',
});

export const useUsersContext = () => useContext(UsersContext);

export const UsersProvider = ({
  children,
}: PropsWithChildren<IUsersProviderProps>) => {
  const [data, setData] = useState<IUserDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const collectionRef = collection(firestore, 'users');

    const unsubscribe = onSnapshotHandler({
      collectionRef,
      setIsLoading,
      setData,
      setError,
    });

    return () => unsubscribe();
  }, []);

  return (
    <UsersContext.Provider value={{ data, isLoading, error }}>
      {children}
    </UsersContext.Provider>
  );
};

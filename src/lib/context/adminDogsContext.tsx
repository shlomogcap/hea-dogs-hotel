import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { AdminDogItem } from '@/pages/api/admin/dogs';

type IAdminDogsContext = {
  data: AdminDogItem[];
  isLoading: boolean;
  error: string;
  accessDenied: boolean;
};

const AdminDogsContext = createContext<IAdminDogsContext>({
  data: [],
  isLoading: false,
  error: '',
  accessDenied: false,
});

export const useAdminDogsContext = () => useContext(AdminDogsContext);

export const AdminDogsProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<AdminDogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setAccessDenied(false);
      try {
        const res = await fetch('/api/admin/dogs', { credentials: 'include' });
        if (res.status === 403) {
          setAccessDenied(true);
          setData([]);
          setError('');
          return;
        }
        if (!res.ok) {
          setData([]);
          setError('Failed to load');
          return;
        }
        setError('');
        const json = await res.json();
        if (json.success && Array.isArray(json.dogs)) {
          setData(json.dogs);
        } else {
          setData([]);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unexpected error');
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <AdminDogsContext.Provider value={{ data, isLoading, error, accessDenied }}>
      {children}
    </AdminDogsContext.Provider>
  );
};

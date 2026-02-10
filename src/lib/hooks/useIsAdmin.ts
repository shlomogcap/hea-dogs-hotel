import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';

export const useIsAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    axios
      .get('/api/admin/check', { withCredentials: true })
      .then(() => {
        if (!cancelled) setIsAdmin(true);
      })
      .catch(() => {
        if (!cancelled) setIsAdmin(false);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  return { isAdmin, isLoading };
};

import { User, onIdTokenChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import nookies from 'nookies';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    onIdTokenChanged(
      auth,
      async (user) => {
        if (user) {
          const token = await user.getIdToken();
          setUser(user);
          nookies.set(undefined, 'token', token, { path: '/' });
        } else {
          setUser(null);
          nookies.set(undefined, 'token', '', { path: '/' });
        }
        setLoading(false);
      },
      (error) => {
        setError(error.message);
      },
    );
  }, [user]);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        await user.getIdToken(true);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return { user, loading, error };
};

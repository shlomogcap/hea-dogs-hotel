import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { clearIndexedDbPersistence, disableNetwork } from 'firebase/firestore';

//TODO:
export const useFirestoreOfflineStatus = () => {
  const [isFirestoreOffline, setIsFirestoreOffline] = useState(false);

  useEffect(() => {
    disableNetwork(firestore)
      .then(() => {
        setIsFirestoreOffline(true);
      })
      .catch((error) => {
        console.error('Error disabling Firestore network:', error);
      });

    return () => {
      clearIndexedDbPersistence(firestore).then(() => {
        console.log('Firestore persistence cleared.');
      });
    };
  }, []);

  return isFirestoreOffline;
};

import { CollectionReference, onSnapshot } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type IOnSnapshotHanderArgs = {
  collectionRef: CollectionReference;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<any[]>>;
  setError: Dispatch<SetStateAction<string>>;
  generalErrorMessage?: string;
};

export const onSnapshotHandler = ({
  collectionRef,
  setIsLoading,
  setData,
  setError,
  generalErrorMessage = '',
}: IOnSnapshotHanderArgs) =>
  onSnapshot(
    collectionRef,
    (snapshot) => {
      setIsLoading(true);

      if (snapshot.size === 0) {
        setData([]);
        setIsLoading(false);
      } else {
        snapshot.docChanges().forEach((change) => {
          const docData = {
            ...change.doc.data(),
            path: change.doc.ref.path,
            id: change.doc.id,
          };
          switch (change.type) {
            case 'added':
              setData((prevData) => [...prevData, docData]);
              break;
            case 'modified':
              setData((prevData) =>
                prevData.map((item) =>
                  item.id === docData.id ? docData : item,
                ),
              );
              break;
            case 'removed':
              setData((prevData) =>
                prevData.filter((item) => item.id !== docData.id),
              );
              break;
            default:
              break;
          }
        });

        setIsLoading(false);
      }
    },
    (error) => {
      const errorMessage = `${generalErrorMessage}\n${error.message}`;
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
    },
  );

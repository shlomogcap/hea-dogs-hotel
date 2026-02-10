import {
  CollectionReference,
  DocumentSnapshot,
  onSnapshot,
  Query,
} from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type IOnSnapshotHanderArgs<T = { id: string }> = {
  /** Collection or collection group query */
  queryRef: Query | CollectionReference;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<T[]>>;
  setError: Dispatch<SetStateAction<string>>;
  generalErrorMessage?: string;
  /** Map document to list item (e.g. add ownerId from path). Default: { ...data(), path, id } */
  mapDoc?: (doc: DocumentSnapshot) => T;
  /** Row key for dedup/update/remove. Default: (item) => item.id */
  getRowKey?: (item: T) => string;
};

const defaultMapDoc = (doc: DocumentSnapshot) => ({
  ...doc.data(),
  path: doc.ref.path,
  id: doc.id,
});

export const onSnapshotHandler = <T = { id: string }>({
  queryRef,
  setIsLoading,
  setData,
  setError,
  generalErrorMessage = '',
  mapDoc,
  getRowKey,
}: IOnSnapshotHanderArgs<T>) =>
  onSnapshot(
    queryRef,
    (snapshot) => {
      setIsLoading(true);

      if (snapshot.size === 0) {
        setData([]);
        setIsLoading(false);
      } else {
        const toItem =
          mapDoc ?? (defaultMapDoc as (doc: DocumentSnapshot) => T);
        const toKey = getRowKey ?? ((item: T) => (item as { id: string }).id);

        snapshot.docChanges().forEach((change) => {
          const docData = toItem(change.doc);
          const key = toKey(docData);
          switch (change.type) {
            case 'added':
              setData((prevData) => {
                if (prevData.some((i) => toKey(i) === key)) return prevData;
                return [...prevData, docData];
              });
              break;
            case 'modified':
              setData((prevData) =>
                prevData.map((item) => (toKey(item) === key ? docData : item)),
              );
              break;
            case 'removed':
              setData((prevData) =>
                prevData.filter((item) => toKey(item) !== key),
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

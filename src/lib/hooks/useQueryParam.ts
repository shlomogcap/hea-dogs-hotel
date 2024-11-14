import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { getFullPathNoQuery } from '../utils/urlUtils';

type IUseQueryParam = {
  key: string;
  initialValue?: string;
};

export const useQueryParam = <T extends string>({
  key,
  initialValue,
}: IUseQueryParam): [T, (newState: T) => void] => {
  const { query, asPath, push, isReady } = useRouter();
  const setQueryValue = useCallback(
    (value: string) => {
      push({
        pathname: getFullPathNoQuery(asPath),
        query: {
          [key]: value,
        },
      });
    },
    [key, asPath, push],
  );
  useEffect(() => {
    if (isReady && initialValue && !query[key]) {
      setQueryValue(initialValue);
    }
  }, [initialValue, isReady, key, query, setQueryValue]);

  return [String(query[key]) as T, setQueryValue];
};

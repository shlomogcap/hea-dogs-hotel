import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useUserContext } from '@/lib/context/userContext';
import {
  getToastMessage,
  type ToastMessageKey,
} from '@/lib/consts/toastMessages';

export function useToast() {
  const { preferences } = useUserContext();
  const lang = (preferences?.lang ?? 'he') as 'he' | 'en';

  const showSuccess = useCallback(
    (key: ToastMessageKey) => {
      toast.success(getToastMessage('success', key, lang));
    },
    [lang],
  );

  const showError = useCallback(
    (key: ToastMessageKey, detail?: string) => {
      toast.error(getToastMessage('error', key, lang, detail));
    },
    [lang],
  );

  return { showSuccess, showError };
}

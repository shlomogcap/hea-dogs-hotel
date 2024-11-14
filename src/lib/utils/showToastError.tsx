import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { getEnumMemberOrSelf } from './enumUtils';
import { AxiosError } from 'axios';

export const showToastError = (
  err: unknown,
  fieldsDisplayTexts?: Record<string, string | number>,
) => {
  const errorMessages: string[] = [];
  if (err instanceof FirebaseError || err instanceof AxiosError) {
    errorMessages.push(`${err.code}: ${err.message}`);
  } else if (err instanceof z.ZodError) {
    Object.entries(err.formErrors.fieldErrors).forEach(([field, errors]) => {
      const fieldDisplayText = getEnumMemberOrSelf(field, fieldsDisplayTexts!);
      errorMessages?.push(`${fieldDisplayText} : ${errors?.join(' , ')}\n`);
    });
  }
  toast.error(
    errorMessages.length > 0 ? (
      <ul>
        {errorMessages.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    ) : (
      'An Error Occured'
    ),
  );
};

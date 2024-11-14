import dayjs from 'dayjs';
import { ECommonFields } from '../consts/commonFields';
import { auth } from '../firebase';

type PreparedFormData<K extends string = string> = { [key in K]: unknown };

export const prepareFormData = <T extends object>(
  formData: T,
  editMode?: boolean,
) => {
  const prepFormData = Object.entries(formData).reduce(
    (acc: PreparedFormData, [key, value]) => {
      if (value instanceof Date) {
        acc[key] = value.toISOString();
      } else if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    },
    {},
  );
  return {
    ...prepFormData,
    ...(editMode
      ? {
          [ECommonFields.UpdatedAt]: dayjs().toISOString(),
        }
      : {
          [ECommonFields.CreatedAt]: dayjs().toISOString(),
          [ECommonFields.CreatedBy]: auth.currentUser?.uid,
        }),
  };
};

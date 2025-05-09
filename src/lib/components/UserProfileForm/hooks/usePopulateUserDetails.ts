import { useUserContext } from '@/lib/context/userContext';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { EUserProfileFields } from '../consts';

const usePopulateUserDetails = () => {
  const { data: userDate } = useUserContext();
  const { reset } = useFormContext();
  useEffect(() => {
    if (userDate) {
      reset({
        [EUserProfileFields.Name]: userDate.displayName,
        [EUserProfileFields.MainEmail]: userDate.email,
        [EUserProfileFields.MainPhone]: userDate.phoneNumber,
      });
    }
  }, [reset, userDate]);
};

export default usePopulateUserDetails;

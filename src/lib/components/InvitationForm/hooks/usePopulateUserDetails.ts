import { useUserContext } from '@/lib/context/userContext';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { EInvitationFormFields } from '../consts';

const usePopulateUserDetails = () => {
  const { data: userDate } = useUserContext();
  const { reset } = useFormContext();
  useEffect(() => {
    if (userDate) {
      reset({
        [EInvitationFormFields.OwnerName]: userDate.displayName,
        [EInvitationFormFields.Email]: userDate.email,
        [EInvitationFormFields.Phone]: userDate.phoneNumber,
      });
    }
  }, [reset, userDate]);
};

export default usePopulateUserDetails;

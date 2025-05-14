import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { FormProvider, TextFieldElement, useForm } from 'react-hook-form-mui';
import { COMMON_DISPLAY_TEXTS } from '@/lib/consts/displayTexts';
import Typography from '@mui/material/Typography';
import { EUserProfileFields, fields, formTitle } from './consts';
import usePopulateUserDetails from './hooks/usePopulateUserDetails';
import axios from 'axios';
import { UpdateRequest } from 'firebase-admin/lib/auth/auth-config';
import { toast } from 'react-toastify';
import { UserProfileFormProps } from './types';

const FormInner = () => {
  usePopulateUserDetails();

  return (
    <Stack sx={{ mt: 2 }} spacing={2} alignItems={'center'}>
      <Typography variant='h5'>{formTitle.he}</Typography>
      <TextFieldElement
        label={fields.he[EUserProfileFields.Name]}
        name={EUserProfileFields.Name}
        required
      />
      <TextFieldElement
        type='email'
        label={fields.he[EUserProfileFields.MainEmail]}
        name={EUserProfileFields.MainEmail}
        required
      />
      <TextFieldElement
        type='tel'
        label={fields.he[EUserProfileFields.MainPhone]}
        name={EUserProfileFields.MainPhone}
        required
      />
      <Button type='submit'>{COMMON_DISPLAY_TEXTS.he.buttons.save}</Button>
    </Stack>
  );
};

export const UserProfileForm = ({ onClose }: UserProfileFormProps) => {
  const form = useForm({
    defaultValues: {
      [EUserProfileFields.Name]: '',
      [EUserProfileFields.MainEmail]: '',
      [EUserProfileFields.MainPhone]: '',
    },
  });
  const onSubmit = form.handleSubmit(async (values) => {
    try {
      axios.patch('/api/user/update', {
        displayName: values[EUserProfileFields.Name],
        phoneNumber: values[EUserProfileFields.MainPhone],
      } as UpdateRequest);
      toast.success('Date Updated successfully');
      onClose();
    } catch (err) {
      toast.error('Update not success');
    }
  });
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <FormInner />
      </form>
    </FormProvider>
  );
};

export default UserProfileForm;

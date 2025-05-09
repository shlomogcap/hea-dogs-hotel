import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {
  FormProvider,
  TextareaAutosizeElement,
  TextFieldElement,
  useForm,
} from 'react-hook-form-mui';
import { DISPLAY_TEXTS } from '@/lib/consts/displayTexts';
import Typography from '@mui/material/Typography';
import { EUserProfileFields, fields, formTitle } from './consts';
import usePopulateUserDetails from './hooks/usePopulateUserDetails';

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
      <TextareaAutosizeElement
        name={EUserProfileFields.Comments}
        placeholder={fields.he[EUserProfileFields.Comments]}
      />
      <Button type='submit'>{DISPLAY_TEXTS.he.buttons.save}</Button>
    </Stack>
  );
};

export const UserProfileForm = () => {
  const form = useForm({
    defaultValues: {
      [EUserProfileFields.Name]: '',
      [EUserProfileFields.MainEmail]: '',
      [EUserProfileFields.MainPhone]: '',
    },
  });
  const onSubmit = form.handleSubmit(async (values) => {
    console.log(values);
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

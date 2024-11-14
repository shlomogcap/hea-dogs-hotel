import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { FormProvider, TextFieldElement, useForm } from 'react-hook-form-mui';
import { DISPLAY_TEXTS } from '@/lib/consts/displayTexts';

enum EUserProfileFields {
  Name = 'name',
  MainEmail = 'mainEmail',
}

const fields = {
  [EUserProfileFields.Name]: {
    label: {
      he: 'שם',
      en: 'Name',
    },
  },
  [EUserProfileFields.MainEmail]: {
    label: {
      he: 'אימייל',
      en: 'Email',
    },
  },
};

export const UserProfileForm = () => {
  const form = useForm({
    defaultValues: {
      [EUserProfileFields.Name]: '',
      [EUserProfileFields.MainEmail]: '',
    },
  });
  const handeLogin = form.handleSubmit(async (values) => {
    console.log(values);
  });
  return (
    <FormProvider {...form}>
      <form onSubmit={handeLogin}>
        <Stack sx={{ mt: 2 }} spacing={2} alignItems={'center'}>
          <TextFieldElement
            label={fields.name.label.he}
            name={EUserProfileFields.Name}
            required
          />
          <TextFieldElement
            type='email'
            label={fields.mainEmail.label.he}
            name={EUserProfileFields.MainEmail}
            required
          />
          <Button type='submit'>{DISPLAY_TEXTS.he.buttons.save}</Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default UserProfileForm;

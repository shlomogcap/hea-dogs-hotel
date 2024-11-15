import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {
  FormProvider,
  TextareaAutosizeElement,
  TextFieldElement,
  useForm,
} from 'react-hook-form-mui';
import { DISPLAY_TEXTS, ILang } from '@/lib/consts/displayTexts';
import Typography from '@mui/material/Typography';
enum EUserProfileFields {
  Name = 'name',
  MainEmail = 'mainEmail',
  MainPhone = 'mainPhone',
  Comments = 'comments',
}

const formTitle: Record<ILang, string> = {
  he: 'פרופיל משתמש',
  en: 'User Profile',
};
const fields: Record<ILang, Record<EUserProfileFields, string>> = {
  he: {
    [EUserProfileFields.Name]: 'שם',
    [EUserProfileFields.MainEmail]: 'אימייל',
    [EUserProfileFields.MainPhone]: 'טלפון',
    [EUserProfileFields.Comments]: 'הערות',
  },
  en: {
    [EUserProfileFields.Name]: 'Name',
    [EUserProfileFields.MainEmail]: 'Email',
    [EUserProfileFields.MainPhone]: 'Phone',
    [EUserProfileFields.Comments]: 'Comments',
  },
};

export const UserProfileForm = () => {
  const form = useForm({
    defaultValues: {
      [EUserProfileFields.Name]: '',
      [EUserProfileFields.MainEmail]: '',
      [EUserProfileFields.MainPhone]: '',
    },
  });
  const handeLogin = form.handleSubmit(async (values) => {
    console.log(values);
  });
  return (
    <FormProvider {...form}>
      <form onSubmit={handeLogin}>
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
      </form>
    </FormProvider>
  );
};

export default UserProfileForm;

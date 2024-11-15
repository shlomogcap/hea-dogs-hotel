import Button from '@mui/material/Button';
import { ILoginModalData } from './LoginModal.types';
import {
  ELoginActions,
  ELoginFields,
  LOGIN_DISPLAY_TEXTS,
} from './LoginModal.consts';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { FirebaseError } from 'firebase/app';
import {
  FormProvider,
  PasswordElement,
  TextFieldElement,
  useForm,
} from 'react-hook-form-mui';
import { useState } from 'react';

export const LoginModal = (_props: ILoginModalData) => {
  const [error, setError] = useState('');
  const form = useForm({
    defaultValues: { [ELoginFields.Email]: '', [ELoginFields.Password]: '' },
  });
  const handeLogin = form.handleSubmit(async (values) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        values[ELoginFields.Email],
        values[ELoginFields.Password],
      );
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-email') {
          setError('invalid email');
          return;
        }
      }
    }
  });
  return (
    <FormProvider {...form}>
      <Dialog open component={'form'} onSubmit={handeLogin}>
        {error && <Alert action='error'>{error}</Alert>}
        <DialogTitle>{LOGIN_DISPLAY_TEXTS.he.title}</DialogTitle>
        <DialogContent sx={{ p: 2 }}>
          <Stack sx={{ mt: 2 }} spacing={2}>
            <TextFieldElement
              label={LOGIN_DISPLAY_TEXTS.he.fields[ELoginFields.Email]}
              name={ELoginFields.Email}
              required
            />
            <PasswordElement
              label={LOGIN_DISPLAY_TEXTS.he.fields[ELoginFields.Password]}
              name={ELoginFields.Password}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type='submit'>
            {LOGIN_DISPLAY_TEXTS.he.actions[ELoginActions.Login]}
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

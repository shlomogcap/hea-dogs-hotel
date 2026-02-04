import Button from '@mui/material/Button';
import { ILoginModalData } from './LoginModal.types';
import {
  AuthModalMode,
  ELoginActions,
  ELoginFields,
  LOGIN_DISPLAY_TEXTS,
} from './LoginModal.consts';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { FirebaseError } from 'firebase/app';
import {
  FormProvider,
  PasswordElement,
  TextFieldElement,
  useForm,
} from 'react-hook-form-mui';
import { useState } from 'react';
import { useUserContext } from '@/lib/context/userContext';
import { ILang } from '@/lib/consts/displayTexts';

const AUTH_ERROR_MESSAGES: Record<
  string,
  Record<ILang, string>
> = {
  'auth/invalid-email': { he: 'כתובת אימייל לא תקינה', en: 'Invalid email address' },
  'auth/user-not-found': { he: 'משתמש לא נמצא', en: 'User not found' },
  'auth/wrong-password': { he: 'סיסמא שגויה', en: 'Wrong password' },
  'auth/email-already-in-use': {
    he: 'כתובת האימייל כבר בשימוש',
    en: 'Email address already in use',
  },
  'auth/weak-password': {
    he: 'הסיסמא חייבת להכיל 6 תווים לפחות',
    en: 'Password must be at least 6 characters',
  },
  'auth/invalid-credential': {
    he: 'אימייל או סיסמא שגויים',
    en: 'Invalid email or password',
  },
};

const getAuthError = (code: string, lang: ILang): string =>
  AUTH_ERROR_MESSAGES[code]?.[lang] ?? AUTH_ERROR_MESSAGES[code]?.en ?? code;

export const LoginModal = (_props: ILoginModalData) => {
  const [error, setError] = useState('');
  const [mode, setMode] = useState<AuthModalMode>('signin');
  const { preferences } = useUserContext();
  const lang = (preferences?.lang ?? 'he') as ILang;
  const texts = LOGIN_DISPLAY_TEXTS[lang];

  const form = useForm({
    defaultValues: {
      [ELoginFields.Email]: '',
      [ELoginFields.Password]: '',
      [ELoginFields.ConfirmPassword]: '',
    },
  });

  const handleAuth = form.handleSubmit(async (values) => {
    setError('');
    try {
      if (mode === 'signup') {
        if (values[ELoginFields.Password] !== values[ELoginFields.ConfirmPassword]) {
          setError(lang === 'he' ? 'הסיסמאות אינן תואמות' : "Passwords don't match");
          return;
        }
        await createUserWithEmailAndPassword(
          auth,
          values[ELoginFields.Email],
          values[ELoginFields.Password],
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          values[ELoginFields.Email],
          values[ELoginFields.Password],
        );
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(getAuthError(err.code, lang));
      }
    }
  });

  const title = mode === 'signin' ? texts.signinTitle : texts.signupTitle;
  const submitLabel =
    mode === 'signin'
      ? texts.actions[ELoginActions.Login]
      : texts.actions[ELoginActions.SignUp];
  const switchLabel = mode === 'signin' ? texts.switchToSignUp : texts.switchToSignIn;

  return (
    <FormProvider {...form}>
      <Dialog open component={'form'} onSubmit={handleAuth}>
        {error && (
          <Alert severity='error' sx={{ m: 2 }}>
            {error}
          </Alert>
        )}
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{ p: 2 }}>
          <Stack sx={{ mt: 2 }} spacing={2}>
            <TextFieldElement
              label={texts.fields[ELoginFields.Email]}
              name={ELoginFields.Email}
              required
              type='email'
            />
            <PasswordElement
              label={texts.fields[ELoginFields.Password]}
              name={ELoginFields.Password}
              required
            />
            {mode === 'signup' && (
              <PasswordElement
                label={texts.fields[ELoginFields.ConfirmPassword]}
                name={ELoginFields.ConfirmPassword}
                required
              />
            )}
          </Stack>
          <Typography variant='body2' sx={{ mt: 2 }}>
            <Link
              component='button'
              type='button'
              variant='body2'
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setError('');
                form.reset();
              }}
            >
              {switchLabel}
            </Link>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button type='submit'>{submitLabel}</Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

import { FormProvider, useForm } from 'react-hook-form';
import DogForm from '../DogForm';
import {
  DogPageProvider,
  useDogPageContext,
} from '@/lib/context/dogPageContext';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useUserContext } from '@/lib/context/userContext';
import { useEffect } from 'react';

const DogPageInner = () => {
  const { data } = useDogPageContext();
  const { preferences } = useUserContext();
  const router = useRouter();
  const form = useForm({ defaultValues: data.currentDog ?? {} });
  const { reset } = form;

  useEffect(() => {
    reset(data.currentDog);
  }, [data.currentDog, reset]);

  return (
    <FormProvider {...form}>
      <IconButton
        aria-label='Back to Dogs Page'
        onClick={() => router.push('/app/dogs')}
        sx={{ mb: 2 }}
      >
        <ArrowBackIcon
          sx={{
            transform: preferences.lang === 'he' ? 'scaleX(-1)' : 'none',
          }}
        />
      </IconButton>
      <DogForm />
    </FormProvider>
  );
};

const DogPage = () => {
  const { query } = useRouter();
  return (
    <DogPageProvider dogId={String(query.dogId)}>
      <DogPageInner />
    </DogPageProvider>
  );
};

export default DogPage;

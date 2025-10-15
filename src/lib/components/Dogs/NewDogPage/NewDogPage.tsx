import { FormProvider, useForm } from 'react-hook-form';
import DogForm from '../DogForm';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useUserContext } from '@/lib/context/userContext';
import { Button } from '@mui/material';
// import axios from 'axios';

const NewDogPage = () => {
  const form = useForm();
  const { preferences } = useUserContext();
  const router = useRouter();
  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
    // axios.post('/api/dogs/create', { ...values });
  });

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
      <DogForm prefix='' />
      <Button onClick={() => router.push('/app/dogs')}>בטל</Button>
      <Button onClick={onSubmit}>שמור</Button>
    </FormProvider>
  );
};

export default NewDogPage;

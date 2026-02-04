import { FormProvider, useForm } from 'react-hook-form';
import DogForm from '../DogForm';
import { useRouter } from 'next/router';
import { useUserContext } from '@/lib/context/userContext';
import { Button, Stack } from '@mui/material';
import { COMMON_DISPLAY_TEXTS, EButtonTexts } from '@/lib/consts/displayTexts';
import { useToast } from '@/lib/hooks/useToast';
import axios from 'axios';
import { CreateDogsBody } from '@/pages/api/dogs/create';
import { uuid } from '@/lib/utils/uuid';
import { EDogFormFields } from '../DogForm/consts';

const NewDogPage = () => {
  const form = useForm();
  const { preferences } = useUserContext();
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const dogId = uuid();
      const body: CreateDogsBody = [
        {
          id: dogId,
          dogId,
          dogName: values[EDogFormFields.DogName] ?? '',
          dogGender: String(values[EDogFormFields.DogGender] ?? ''),
          dogBread: values[EDogFormFields.DogBread] ?? '',
          dogAge: String(values[EDogFormFields.DogAge] ?? ''),
          dogPhysicalDescription:
            values[EDogFormFields.DogPhysicalDescription] ?? '',
        },
      ];
      const result = await axios.post('/api/dogs/create', body);
      if (!result.data.success) throw new Error(result.data.message);
      showSuccess('dogCreated');
      router.push('/app/dogs');
    } catch (err) {
      showError('dogCreateFailed', (err as Error).message);
    }
  });

  return (
    <FormProvider {...form}>
      <DogForm prefix='' />
      <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
        <Button variant='outlined' onClick={() => router.push('/app/dogs')}>
          {
            COMMON_DISPLAY_TEXTS[preferences.lang || 'he'].buttons[
              EButtonTexts.Cancel
            ]
          }
        </Button>
        <Button variant='contained' onClick={onSubmit}>
          {
            COMMON_DISPLAY_TEXTS[preferences.lang || 'he'].buttons[
              EButtonTexts.Save
            ]
          }
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default NewDogPage;

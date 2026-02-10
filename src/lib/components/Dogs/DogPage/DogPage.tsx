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
import { Button, Stack } from '@mui/material';
import { COMMON_DISPLAY_TEXTS, EButtonTexts } from '@/lib/consts/displayTexts';
import { useToast } from '@/lib/hooks/useToast';
import axios from 'axios';
import type { UpdateDogBody } from '@/pages/api/dogs/update';
import { EDogFormFields } from '../DogForm/consts';

const DogPageInner = () => {
  const { data } = useDogPageContext();
  const { preferences } = useUserContext();
  const router = useRouter();
  const fromHome = router.query.from === 'home';
  const { showSuccess, showError } = useToast();
  const form = useForm({ defaultValues: data.currentDog ?? {} });
  const { reset, handleSubmit } = form;

  useEffect(() => {
    reset(data.currentDog ?? {});
  }, [data.currentDog, reset]);

  const onSave = handleSubmit(async (values) => {
    const dogId = data.currentDog?.id ?? data.currentDog?.dogId;
    if (!dogId) {
      showError('dogNotLoaded');
      return;
    }
    const payload: UpdateDogBody = {
      dogId,
      dogName: values[EDogFormFields.DogName] ?? '',
      dogGender: String(values[EDogFormFields.DogGender] ?? ''),
      dogBread: values[EDogFormFields.DogBread] ?? '',
      dogAge: String(values[EDogFormFields.DogAge] ?? ''),
      dogPhysicalDescription:
        values[EDogFormFields.DogPhysicalDescription] ?? '',
    };

    try {
      const result = await axios.patch('/api/dogs/update', payload);
      if (!result.data.success) throw new Error(result.data.message);
      showSuccess('dogUpdated');
    } catch (err) {
      showError('dogSaveFailed', (err as Error).message);
    }
  });

  return (
    <FormProvider {...form}>
      <IconButton
        aria-label={fromHome ? 'Back to dashboard' : 'Back to Dogs Page'}
        onClick={() =>
          router.push(fromHome ? '/app' : '/app/dogs')
        }
        sx={{ mb: 2 }}
      >
        <ArrowBackIcon
          sx={{
            transform: preferences.lang === 'he' ? 'scaleX(-1)' : 'none',
          }}
        />
      </IconButton>
      <DogForm />
      <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
        <Button variant='contained' onClick={onSave}>
          {
            COMMON_DISPLAY_TEXTS[preferences.lang ?? 'he'].buttons[
              EButtonTexts.Save
            ]
          }
        </Button>
      </Stack>
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

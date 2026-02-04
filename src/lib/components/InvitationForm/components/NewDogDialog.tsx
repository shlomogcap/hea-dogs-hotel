import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { FormProvider, useForm } from 'react-hook-form';
import DogForm from '@/lib/components/Dogs/DogForm';
import { useCallback } from 'react';
import axios from 'axios';
import { CreateDogsBody, IDogDoc } from '@/pages/api/dogs/create';
import { uuid } from '@/lib/utils/uuid';
import { COMMON_DISPLAY_TEXTS, EButtonTexts } from '@/lib/consts/displayTexts';
import { useUserContext } from '@/lib/context/userContext';
import { useToast } from '@/lib/hooks/useToast';

type NewDogDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreated: (dog: IDogDoc) => void;
};

type NewDogFormValues = {
  dogName: string;
  dogGender: string;
  dogBread: string;
  dogAge: string;
  dogPhysicalDescription: string;
};

const defaultValues: NewDogFormValues = {
  dogName: '',
  dogGender: '',
  dogBread: '',
  dogAge: '',
  dogPhysicalDescription: '',
};

const DIALOG_TITLE: Record<'he' | 'en', string> = {
  he: 'הוספת כלב חדש',
  en: 'Add new dog',
};

export default function NewDogDialog({
  open,
  onClose,
  onCreated,
}: NewDogDialogProps) {
  const { preferences } = useUserContext();
  const { showSuccess, showError } = useToast();
  const form = useForm<NewDogFormValues>({ defaultValues });
  const { handleSubmit, reset } = form;
  const lang = preferences?.lang ?? 'he';

  const onSubmit = useCallback(
    async (values: NewDogFormValues) => {
      try {
        const dogId = uuid();
        const body: CreateDogsBody = [
          {
            id: dogId,
            dogId,
            dogName: values.dogName,
            dogGender: values.dogGender,
            dogBread: values.dogBread,
            dogAge: String(values.dogAge),
            dogPhysicalDescription: values.dogPhysicalDescription,
          },
        ];
        const result = await axios.post('/api/dogs/create', body);
        if (!result.data.success) throw new Error(result.data.message);
        const newDog: IDogDoc = {
          id: dogId,
          dogId,
          dogName: values.dogName,
          dogGender: values.dogGender,
          dogBread: values.dogBread,
          dogAge: String(values.dogAge),
          dogPhysicalDescription: values.dogPhysicalDescription,
        };
        showSuccess('dogCreatedAndAttached');
        reset(defaultValues);
        onCreated(newDog);
        onClose();
      } catch (err) {
        showError('dogCreateFailed', (err as Error).message);
      }
    },
    [onCreated, onClose, reset, showSuccess, showError],
  );

  const handleClose = useCallback(() => {
    reset(defaultValues);
    onClose();
  }, [onClose, reset]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle>{DIALOG_TITLE[lang]}</DialogTitle>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DogForm disabled={false} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              {COMMON_DISPLAY_TEXTS[lang].buttons[EButtonTexts.Cancel]}
            </Button>
            <Button type='submit' variant='contained'>
              {COMMON_DISPLAY_TEXTS[lang].buttons[EButtonTexts.Add]}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}

import Button from '@mui/material/Button';
import {
  AutocompleteElement,
  FormProvider,
  TextareaAutosizeElement,
  TextFieldElement,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form-mui';
import FormSection from './FormSection';
import { DISPLAY_TEXTS, EInvitationFormFields } from '../consts';
import { useRef, useState } from 'react';
import DogSelect, { ADD_DOG_VALUE } from './DogSelect';
import { Stack } from '@mui/material';
import { CreateDogBody } from '@/pages/api/invitation/create';
import axios from 'axios';
import { toast } from 'react-toastify';

type DogSectionProps = {
  disabled?: boolean;
  onRemove: () => void;
  prefix: string;
};

const DogSectionInner = ({ disabled, onRemove, prefix }: DogSectionProps) => {
  const [formEditable, setFormEditable] = useState(false);
  const dogSelectField = prefix + EInvitationFormFields.SelectDog;
  const dogSelect = useWatch({ name: dogSelectField });
  const { setValue, handleSubmit } = useFormContext();
  const isDisabled = !formEditable || disabled;
  const dogNameRef = useRef<HTMLInputElement>(null);
  const createNewDog = handleSubmit(async (values) => {
    try {
      const result = await axios.post('/api/dogs/create', {
        ...values,
      } as CreateDogBody);
      if (!result.data.success) throw new Error(result.data.message);
      toast.success('Invitation Created successfully');
    } catch (err) {
      toast.error('Invitation Failed to create' + (err as Error).message);
    }
  });
  return (
    <FormSection>
      <DogSelect
        disabled={disabled}
        name={dogSelectField}
        onSelect={(dog) => {
          const isNewDog = dog?.value === ADD_DOG_VALUE;
          setFormEditable(isNewDog);
          setValue(
            prefix + EInvitationFormFields.DogName,
            isNewDog ? '' : dog?.label,
          );
          setTimeout(() => {
            if (isNewDog) {
              const el = dogNameRef.current?.querySelector('input');
              console.log(el);
              el?.focus();
            }
          }, 0);
        }}
      />
      {dogSelect?.value === ADD_DOG_VALUE && (
        <TextFieldElement
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.DogName]}
          name={prefix + EInvitationFormFields.DogName}
          required
          fullWidth
          sx={{ minWidth: 0, width: '100%' }}
          ref={dogNameRef}
        />
      )}
      <AutocompleteElement
        label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.DogGender]}
        name={prefix + EInvitationFormFields.DogGender}
        options={DISPLAY_TEXTS.genderOptions.he}
        autocompleteProps={{
          fullWidth: true,
          getOptionLabel: (v) => v.label,
          isOptionEqualToValue: (opt, v) => opt?.value === v?.value,
          sx: { minWidth: 0, width: '100%' },
          disabled: isDisabled,
        }}
        required
      />
      <TextFieldElement
        label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.DogBread]}
        name={prefix + EInvitationFormFields.DogBread}
        required
        fullWidth
        sx={{ minWidth: 0, width: '100%' }}
        disabled={isDisabled}
      />
      <TextFieldElement
        type='number'
        label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.DogAge]}
        name={prefix + EInvitationFormFields.DogAge}
        required
        fullWidth
        sx={{ minWidth: 0, width: '100%' }}
        disabled={isDisabled}
      />
      <TextareaAutosizeElement
        label={
          DISPLAY_TEXTS.formFields.he[
            EInvitationFormFields.DogPhysicalDescription
          ]
        }
        name={prefix + EInvitationFormFields.DogPhysicalDescription}
        required
        fullWidth
        sx={{ minWidth: 0, width: '100%' }}
        disabled={isDisabled}
      />
      <Stack
        direction='row'
        spacing={2}
        sx={{ mt: 1, alignContent: 'flex-end' }}
      >
        {dogSelect?.value === ADD_DOG_VALUE && (
          <Button onClick={createNewDog} sx={{ alignSelf: 'end' }}>
            הוסף
          </Button>
        )}
        {dogSelect?.value !== ADD_DOG_VALUE && (
          <Button onClick={onRemove} sx={{ alignSelf: 'end' }} color='error'>
            הסר
          </Button>
        )}
      </Stack>
    </FormSection>
  );
};

const DogSection = (props: DogSectionProps) => {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <DogSectionInner {...props} />
    </FormProvider>
  );
};

export default DogSection;

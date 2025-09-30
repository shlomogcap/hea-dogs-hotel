import {
  AutocompleteElement,
  TextareaAutosizeElement,
  TextFieldElement,
} from 'react-hook-form-mui';
import { DISPLAY_TEXTS, EDogFormFields } from './consts';
import { useUserContext } from '@/lib/context/userContext';
import Stack from '@mui/material/Stack';

type DogFormProps = {
  disabled?: boolean;
  prefix?: string;
};

const DogForm = ({ prefix = '', disabled }: DogFormProps) => {
  const {
    preferences: { lang = 'he' },
  } = useUserContext();
  return (
    <Stack spacing={2}>
      <TextFieldElement
        label={DISPLAY_TEXTS.formFields[lang][EDogFormFields.DogName]}
        name={prefix + EDogFormFields.DogName}
        required
        fullWidth
        sx={{ minWidth: 0, width: '100%' }}
      />
      <AutocompleteElement
        label={DISPLAY_TEXTS.formFields[lang][EDogFormFields.DogGender]}
        name={prefix + EDogFormFields.DogGender}
        options={DISPLAY_TEXTS.genderOptions[lang]}
        autocompleteProps={{
          fullWidth: true,
          getOptionLabel: (v) => v.label,
          isOptionEqualToValue: (opt, v) => opt?.value === v?.value,
          sx: { minWidth: 0, width: '100%' },
          disabled: disabled,
        }}
        required
      />
      <TextFieldElement
        label={DISPLAY_TEXTS.formFields[lang][EDogFormFields.DogBread]}
        name={prefix + EDogFormFields.DogBread}
        required
        fullWidth
        sx={{ minWidth: 0, width: '100%' }}
        disabled={disabled}
      />
      <TextFieldElement
        type='number'
        label={DISPLAY_TEXTS.formFields[lang][EDogFormFields.DogAge]}
        name={prefix + EDogFormFields.DogAge}
        required
        fullWidth
        sx={{ minWidth: 0, width: '100%' }}
        disabled={disabled}
      />
      <TextareaAutosizeElement
        label={
          DISPLAY_TEXTS.formFields[lang][EDogFormFields.DogPhysicalDescription]
        }
        name={prefix + EDogFormFields.DogPhysicalDescription}
        required
        fullWidth
        sx={{ minWidth: 0, width: '100%' }}
        disabled={disabled}
      />
    </Stack>
  );
};

export default DogForm;

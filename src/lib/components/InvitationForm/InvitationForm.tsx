import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {
  TextFieldElement,
  useFieldArray,
  useFormContext,
} from 'react-hook-form-mui';
import FormSection from './components/FormSection';
import {
  DISPLAY_TEXTS,
  EInvitationFormFields,
  EInvitationFormSections,
} from './consts';
import usePopulateUserDetails from './hooks/usePopulateUserDetails';
import { COMMON_DISPLAY_TEXTS } from '@/lib/consts/displayTexts';
import DogSection from './components/DogSection';

type InvitationFormProps = {
  disabled?: boolean;
  onFormSubmit: (values: any) => void;
};

const InvitationForm = ({ disabled, onFormSubmit }: InvitationFormProps) => {
  usePopulateUserDetails();
  const { handleSubmit } = useFormContext();
  const onSubmit = handleSubmit(onFormSubmit);
  const {
    fields: dogs,
    append: appendDog,
    remove,
  } = useFieldArray({ name: 'dogs' });
  return (
    <Box
      sx={{
        p: { xs: 0.5, sm: 2 },
        borderRadius: 2,
        display: 'grid',
        placeItems: 'center',
        bgcolor: 'grey.100',
        rowGap: { xs: 1.5, sm: 2 },
        maxWidth: '100vw',
        minWidth: 0,
        mx: 'auto',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <FormSection
        title={
          DISPLAY_TEXTS.formSections.he[EInvitationFormSections.OwnerDetails]
        }
      >
        <TextFieldElement
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.OwnerName]}
          name={EInvitationFormFields.OwnerName}
          required
          fullWidth
          sx={{ minWidth: 0, width: '100%' }}
          disabled={disabled}
        />
        <TextFieldElement
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.OwnerId]}
          name={EInvitationFormFields.OwnerId}
          required
          fullWidth
          sx={{ minWidth: 0, width: '100%' }}
          disabled={disabled}
        />
        <TextFieldElement
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.Phone]}
          name={EInvitationFormFields.Phone}
          required
          fullWidth
          sx={{ minWidth: 0, width: '100%' }}
          disabled={disabled}
        />
        <TextFieldElement
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.Email]}
          name={EInvitationFormFields.Email}
          required
          fullWidth
          sx={{ minWidth: 0, width: '100%' }}
          disabled
        />
      </FormSection>
      <FormSection
        title={
          DISPLAY_TEXTS.formSections.he[
            EInvitationFormSections.InvitationDetails
          ]
        }
      >
        <TextFieldElement
          type='date'
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.SDate]}
          name={EInvitationFormFields.SDate}
          fullWidth
          required
          sx={{ minWidth: 0, width: '100%' }}
          disabled={disabled}
        />
        <TextFieldElement
          type='time'
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.SHour]}
          name={EInvitationFormFields.SHour}
          fullWidth
          sx={{ minWidth: 0, width: '100%' }}
          disabled={disabled}
        />
        <TextFieldElement
          type='date'
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.EDate]}
          name={EInvitationFormFields.EDate}
          required
          fullWidth
          sx={{ minWidth: 0, width: '100%' }}
          disabled={disabled}
        />
        <TextFieldElement
          type='time'
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.EHour]}
          name={EInvitationFormFields.EHour}
          fullWidth
          sx={{ minWidth: 0, width: '100%' }}
          disabled={disabled}
        />
      </FormSection>
      <FormSection
        title={
          DISPLAY_TEXTS.formSections.he[EInvitationFormSections.DogDetails]
        }
      >
        {dogs.map((_, index) => {
          const prefix = `dogs.${index}.` as const;
          return (
            <DogSection
              key={prefix}
              prefix={prefix}
              onRemove={() => remove(index)}
              disabled={disabled}
            />
          );
        })}
        <FormSection>
          <Button onClick={appendDog} fullWidth sx={{ mt: 2 }}>
            הוספת כלב
          </Button>
        </FormSection>
      </FormSection>
      {!disabled && (
        <Button onClick={onSubmit} fullWidth sx={{ mt: 2 }}>
          {COMMON_DISPLAY_TEXTS.he.buttons.add}
        </Button>
      )}
    </Box>
  );
};

export default InvitationForm;

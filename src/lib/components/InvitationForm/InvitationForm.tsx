import { Box } from '@mui/material';
import {
  AutocompleteElement,
  TextareaAutosizeElement,
  TextFieldElement,
} from 'react-hook-form-mui';
import FormSection from './components/FormSection';
import {
  DISPLAY_TEXTS,
  EInvitationFormFields,
  EInvitationFormSections,
} from './consts';

const InvitationForm = () => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        display: 'grid',
        placeItems: 'center',
        bgcolor: 'grey.100',
        rowGap: 2,
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
        />
        <TextFieldElement
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.OwnerId]}
          name={EInvitationFormFields.OwnerId}
          required
          fullWidth
        />
        <TextFieldElement
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.Phone]}
          name={EInvitationFormFields.Phone}
          required
          fullWidth
        />
        <TextFieldElement
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.Email]}
          name={EInvitationFormFields.Email}
          required
          fullWidth
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
        />
      </FormSection>
      <FormSection
        title={
          DISPLAY_TEXTS.formSections.he[EInvitationFormSections.DogDetails]
        }
      >
        <TextFieldElement
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.DogName]}
          name={EInvitationFormFields.DogName}
          required
          fullWidth
        />
        <AutocompleteElement
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.DogGender]}
          name={EInvitationFormFields.DogGender}
          options={DISPLAY_TEXTS.genderOptions.he}
          autocompleteProps={{
            fullWidth: true,
            getOptionLabel: (v) => v.label,
            isOptionEqualToValue: (opt, v) => opt?.value === v?.value,
          }}
          required
        />
        <TextFieldElement
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.DogBread]}
          name={EInvitationFormFields.DogBread}
          required
          fullWidth
        />
        <TextFieldElement
          type='number'
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.DogAge]}
          name={EInvitationFormFields.DogAge}
          required
          fullWidth
        />
        <TextareaAutosizeElement
          label={
            DISPLAY_TEXTS.formFields.he[
              EInvitationFormFields.DogPhysicalDescription
            ]
          }
          name={EInvitationFormFields.DogPhysicalDescription}
          required
          fullWidth
        />
      </FormSection>
    </Box>
  );
};

export default InvitationForm;

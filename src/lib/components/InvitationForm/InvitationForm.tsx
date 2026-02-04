import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {
  SelectElement,
  TextFieldElement,
  useFieldArray,
  useFormContext,
} from 'react-hook-form-mui';
import FormSection from './components/FormSection';
import {
  DISPLAY_TEXTS,
  EInvitationFormFields,
  EInvitationFormSections,
  EInvitationStatus,
  INVITATION_STATUS_LABELS,
} from './consts';
import usePopulateUserDetails from './hooks/usePopulateUserDetails';
import { COMMON_DISPLAY_TEXTS, EButtonTexts } from '@/lib/consts/displayTexts';
import DogSection from './components/DogSection';
import { useUserContext } from '@/lib/context/userContext';
import { IDogDoc } from '@/pages/api/dogs/create';
import { ADD_DOG_VALUE } from './components/DogSelect';
import { useToast } from '@/lib/hooks/useToast';

const DEFAULT_DOG_SLOT = {
  selectDog: null as { value: string; label: string } | null,
  dogName: '',
  dogGender: null as { value: string; label: string } | null,
  dogBread: '',
  dogAge: '',
  dogPhysicalDescription: '',
};

const ADD_DOG_SLOT_LABEL: Record<'he' | 'en', string> = {
  he: 'הוספת כלב',
  en: 'Add dog',
};

function buildDogsFromFormValues(
  slots: Array<Record<string, unknown>>,
): IDogDoc[] {
  return slots
    .filter((slot) => {
      const sel = slot[EInvitationFormFields.SelectDog] as
        | { value: string }
        | string
        | null
        | undefined;
      const id = typeof sel === 'object' && sel ? sel.value : sel;
      return id && id !== ADD_DOG_VALUE;
    })
    .map((slot) => {
      const sel = slot[EInvitationFormFields.SelectDog] as
        | { value: string }
        | string;
      const id = typeof sel === 'object' ? sel.value : sel;
      const gender = slot[EInvitationFormFields.DogGender] as
        | { value: string }
        | string
        | undefined;
      const genderValue =
        typeof gender === 'object' && gender ? gender.value : gender ?? '';
      return {
        id,
        dogId: id,
        dogName: String(slot[EInvitationFormFields.DogName] ?? ''),
        dogGender: genderValue,
        dogBread: String(slot[EInvitationFormFields.DogBread] ?? ''),
        dogAge: String(slot[EInvitationFormFields.DogAge] ?? ''),
        dogPhysicalDescription: String(
          slot[EInvitationFormFields.DogPhysicalDescription] ?? '',
        ),
      } as IDogDoc;
    });
}

type InvitationFormProps = {
  disabled?: boolean;
  onFormSubmit: (values: any) => void;
  /** Override submit button label (e.g. "Save" in edit mode) */
  submitLabel?: string;
  /** When true (edit existing): only dates and dogs are editable; owner and status are read-only; at least one dog required */
  editOnlyDatesAndDogs?: boolean;
};

const InvitationForm = ({
  disabled,
  onFormSubmit,
  submitLabel,
  editOnlyDatesAndDogs = false,
}: InvitationFormProps) => {
  usePopulateUserDetails();
  const { preferences } = useUserContext();
  const { showError } = useToast();
  const { handleSubmit } = useFormContext();
  const onSubmit = handleSubmit((values) => {
    const dogsList = buildDogsFromFormValues(values.dogs ?? []);
    if (dogsList.length === 0) {
      showError('invitationAtLeastOneDogRequired');
      return;
    }
    const payload = {
      ...values,
      dogs: dogsList,
    };
    onFormSubmit(payload);
  });
  const ownerSectionDisabled = disabled || editOnlyDatesAndDogs;
  const {
    fields: dogs,
    append: appendDog,
    remove,
  } = useFieldArray({ name: 'dogs' });

  const handleAppendDog = () => appendDog(DEFAULT_DOG_SLOT);
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
          disabled={ownerSectionDisabled}
        />
        <TextFieldElement
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.OwnerId]}
          name={EInvitationFormFields.OwnerId}
          required
          fullWidth
          sx={{ minWidth: 0, width: '100%' }}
          disabled={ownerSectionDisabled}
        />
        <TextFieldElement
          label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.Phone]}
          name={EInvitationFormFields.Phone}
          required
          fullWidth
          sx={{ minWidth: 0, width: '100%' }}
          disabled={ownerSectionDisabled}
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
        <SelectElement
          name={EInvitationFormFields.Status}
          label={
            DISPLAY_TEXTS.formFields[preferences?.lang ?? 'he'][
              EInvitationFormFields.Status
            ]
          }
          options={Object.values(EInvitationStatus).map((value) => ({
            id: value,
            label: INVITATION_STATUS_LABELS[preferences?.lang ?? 'he'][value],
          }))}
          fullWidth
          sx={{ minWidth: 0, width: '100%' }}
          disabled
        />
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
              slotIndex={index}
              onRemove={() => remove(index)}
              disabled={disabled}
            />
          );
        })}
        {!disabled && (
          <FormSection>
            <Button onClick={handleAppendDog} fullWidth sx={{ mt: 2 }}>
              {ADD_DOG_SLOT_LABEL[preferences?.lang ?? 'he']}
            </Button>
          </FormSection>
        )}
      </FormSection>
      {!disabled && (
        <Button
          onClick={onSubmit}
          variant='contained'
          sx={{ mt: 2, width: 320 }}
        >
          {submitLabel ??
            COMMON_DISPLAY_TEXTS[preferences.lang || 'he'].buttons[
              EButtonTexts.Add
            ]}
        </Button>
      )}
    </Box>
  );
};

export default InvitationForm;

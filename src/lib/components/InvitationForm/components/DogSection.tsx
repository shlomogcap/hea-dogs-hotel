import Button from '@mui/material/Button';
import {
  AutocompleteElement,
  TextareaAutosizeElement,
  TextFieldElement,
  useFormContext,
  useWatch,
} from 'react-hook-form-mui';
import FormSection from './FormSection';
import { DISPLAY_TEXTS, EInvitationFormFields } from '../consts';
import { useCallback, useMemo, useState } from 'react';
import DogSelect, { ADD_DOG_VALUE } from './DogSelect';
import NewDogDialog from './NewDogDialog';
import Collapse from '@mui/material/Collapse';
import { Stack } from '@mui/material';
import { IDogDoc } from '@/pages/api/dogs/create';
import { useDogsContext } from '@/lib/context/userDogsContext';
import { useUserContext } from '@/lib/context/userContext';

type DogSectionProps = {
  disabled?: boolean;
  onRemove: () => void;
  prefix: string;
  /** Index of this dog slot (used to exclude other slots' selections) */
  slotIndex: number;
};

const ADD_NEW_DOG_LABEL: Record<'he' | 'en', string> = {
  he: 'הוספת כלב חדש',
  en: 'Add new dog',
};

const REMOVE_LABEL: Record<'he' | 'en', string> = {
  he: 'הסר',
  en: 'Remove',
};

export default function DogSection({
  disabled,
  onRemove,
  prefix,
  slotIndex,
}: DogSectionProps) {
  const { preferences } = useUserContext();
  const lang = preferences?.lang ?? 'he';
  const { data: dogs } = useDogsContext();
  const [newDogDialogOpen, setNewDogDialogOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const dogSelectField = prefix + EInvitationFormFields.SelectDog;
  const dogSelect = useWatch({ name: dogSelectField });
  const dogsArray = useWatch({ name: 'dogs' });
  const { setValue } = useFormContext();

  const selectedDogIdsInOtherSlots = useMemo(() => {
    const ids: string[] = [];
    const slots = (dogsArray ?? []) as Array<{
      selectDog?: { value: string } | null;
    }>;
    slots.forEach((slot, i) => {
      if (i === slotIndex) return;
      const sel = slot.selectDog;
      const id = typeof sel === 'object' && sel ? sel.value : sel;
      if (id && id !== ADD_DOG_VALUE) ids.push(id);
    });
    return ids;
  }, [dogsArray, slotIndex]);

  const isExistingDog = dogSelect?.value && dogSelect.value !== ADD_DOG_VALUE;
  const isAddNewSelected = dogSelect?.value === ADD_DOG_VALUE;
  const genderOptions = DISPLAY_TEXTS.genderOptions[lang];

  const handleSelect = useCallback(
    (dog: { value: string; label: string } | null) => {
      if (!dog) return;
      if (dog.value === ADD_DOG_VALUE) {
        setNewDogDialogOpen(true);
        return;
      }
      const existingDog = dogs?.find((d) => d.id === dog.value);
      if (existingDog) {
        setValue(prefix + EInvitationFormFields.DogName, existingDog.dogName);
        setValue(prefix + EInvitationFormFields.DogBread, existingDog.dogBread);
        setValue(prefix + EInvitationFormFields.DogAge, existingDog.dogAge);
        setValue(
          prefix + EInvitationFormFields.DogPhysicalDescription,
          existingDog.dogPhysicalDescription,
        );
        const genderOption =
          genderOptions.find((o) => o.value === existingDog.dogGender) ?? null;
        setValue(prefix + EInvitationFormFields.DogGender, genderOption);
      }
    },
    [dogs, genderOptions, prefix, setValue],
  );

  const handleNewDogCreated = useCallback(
    (newDog: IDogDoc) => {
      setValue(dogSelectField, { value: newDog.id, label: newDog.dogName });
      setValue(prefix + EInvitationFormFields.DogName, newDog.dogName);
      setValue(prefix + EInvitationFormFields.DogBread, newDog.dogBread);
      setValue(prefix + EInvitationFormFields.DogAge, newDog.dogAge);
      setValue(
        prefix + EInvitationFormFields.DogPhysicalDescription,
        newDog.dogPhysicalDescription,
      );
      const genderOption =
        genderOptions.find((o) => o.value === newDog.dogGender) ?? null;
      setValue(prefix + EInvitationFormFields.DogGender, genderOption);
      setNewDogDialogOpen(false);
    },
    [dogSelectField, genderOptions, prefix, setValue],
  );

  const handleRemove = useCallback(() => {
    setIsExiting(true);
  }, []);

  const handleExited = useCallback(() => {
    onRemove();
  }, [onRemove]);

  return (
    <Collapse in={!isExiting} onExited={handleExited} timeout={300}>
      <FormSection>
        <DogSelect
          disabled={disabled}
          name={dogSelectField}
          onSelect={handleSelect}
          excludeDogIds={selectedDogIdsInOtherSlots}
        />
        {isAddNewSelected && !disabled && (
          <Button
            variant='outlined'
            fullWidth
            onClick={() => setNewDogDialogOpen(true)}
            sx={{ mt: 1 }}
          >
            {ADD_NEW_DOG_LABEL[lang]}
          </Button>
        )}
        {isExistingDog && (
          <>
            <TextFieldElement
              label={
                DISPLAY_TEXTS.formFields[lang][EInvitationFormFields.DogName]
              }
              name={prefix + EInvitationFormFields.DogName}
              fullWidth
              sx={{ minWidth: 0, width: '100%' }}
              disabled
            />
            <AutocompleteElement
              label={
                DISPLAY_TEXTS.formFields[lang][EInvitationFormFields.DogGender]
              }
              name={prefix + EInvitationFormFields.DogGender}
              options={genderOptions}
              autocompleteProps={{
                fullWidth: true,
                getOptionLabel: (v) => v.label,
                isOptionEqualToValue: (opt, v) => opt?.value === v?.value,
                sx: { minWidth: 0, width: '100%' },
                disabled: true,
              }}
            />
            <TextFieldElement
              label={
                DISPLAY_TEXTS.formFields[lang][EInvitationFormFields.DogBread]
              }
              name={prefix + EInvitationFormFields.DogBread}
              fullWidth
              sx={{ minWidth: 0, width: '100%' }}
              disabled
            />
            <TextFieldElement
              type='number'
              label={
                DISPLAY_TEXTS.formFields[lang][EInvitationFormFields.DogAge]
              }
              name={prefix + EInvitationFormFields.DogAge}
              fullWidth
              sx={{ minWidth: 0, width: '100%' }}
              disabled
            />
            <TextareaAutosizeElement
              label={
                DISPLAY_TEXTS.formFields[lang][
                  EInvitationFormFields.DogPhysicalDescription
                ]
              }
              name={prefix + EInvitationFormFields.DogPhysicalDescription}
              fullWidth
              sx={{ minWidth: 0, width: '100%' }}
              disabled
            />
          </>
        )}
        {!disabled && (
          <Stack
            direction='row'
            spacing={2}
            sx={{ mt: 1, alignContent: 'flex-end' }}
          >
            <Button
              onClick={handleRemove}
              sx={{ alignSelf: 'end' }}
              color='error'
            >
              {REMOVE_LABEL[lang]}
            </Button>
          </Stack>
        )}
        <NewDogDialog
          open={newDogDialogOpen}
          onClose={() => setNewDogDialogOpen(false)}
          onCreated={handleNewDogCreated}
        />
      </FormSection>
    </Collapse>
  );
}

import { AutocompleteElement } from 'react-hook-form-mui';
import { useDogsContext } from '@/lib/context/userDogsContext';
import { ILang } from '@/lib/consts/displayTexts';
import { useUserContext } from '@/lib/context/userContext';
import { useMemo } from 'react';
import { DISPLAY_TEXTS, EInvitationFormFields } from '../consts';
import { Button } from '@mui/material';

export const ADD_DOG_VALUE = 'add';

const ADD_DOG_LABEL: Record<ILang, string> = {
  he: '+ הוסף כלב חדש',
  en: '+ Add New Dog',
};

type DogSelectProps = {
  name: string;
  disabled?: boolean;
  onSelect: (dog: any) => void;
  /** Dog IDs already selected in other slots (excluded from options) */
  excludeDogIds?: string[];
};

const DogSelect = ({
  name,
  disabled,
  onSelect,
  excludeDogIds = [],
}: DogSelectProps) => {
  const { data: dogs } = useDogsContext();
  const { preferences } = useUserContext();
  const ADD_DOG_OPTION = useMemo(
    () => ({
      label: ADD_DOG_LABEL[preferences.lang ?? 'he'],
      value: ADD_DOG_VALUE,
    }),
    [preferences.lang],
  );
  const options = useMemo(
    () => [
      ...(dogs
        ?.filter((d) => !excludeDogIds.includes(d.id))
        .map((d) => ({ value: d.id, label: d.dogName })) ?? []),
      ...(disabled ? [] : [ADD_DOG_OPTION]),
    ],
    [dogs, excludeDogIds, ADD_DOG_OPTION, disabled],
  );
  return (
    <AutocompleteElement
      label={DISPLAY_TEXTS.formFields.he[EInvitationFormFields.DogName]}
      name={name}
      options={options}
      autocompleteProps={{
        fullWidth: true,
        getOptionLabel: (v) => v.label,
        isOptionEqualToValue: (opt, v) => opt?.value === v?.value,
        sx: { minWidth: 0, width: '100%' },
        disabled,
        onChange: (_: any, value: any) => onSelect(value),
        renderOption: (props, option) => {
          if (option.value === ADD_DOG_VALUE) {
            return (
              <li {...props} style={{ justifyContent: 'center' }}>
                <Button
                  variant='text'
                  color='primary'
                  fullWidth
                  tabIndex={0}
                  style={{ textTransform: 'none' }}
                >
                  {option.label}
                </Button>
              </li>
            );
          }
          return <li {...props}>{option.label}</li>;
        },
      }}
      required
    />
  );
};

export default DogSelect;

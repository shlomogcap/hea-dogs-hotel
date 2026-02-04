import {
  InvitationPageProvider,
  useInvitationPageContext,
} from '@/lib/context/InvitationPageContext';
import { useRouter } from 'next/router';
import InvitationForm from '../InvitationForm';
import { FormProvider, useForm } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import { useUserContext } from '@/lib/context/userContext';
import { IInvitationDoc } from '@/pages/api/invitation/create';
import { DISPLAY_TEXTS } from '../InvitationForm/consts';
import { DogsProvider } from '@/lib/context/userDogsContext';
import { useToast } from '@/lib/hooks/useToast';
import axios from 'axios';
import { COMMON_DISPLAY_TEXTS, EButtonTexts } from '@/lib/consts/displayTexts';

/** Convert invitation doc from BE to form shape (dogs array with selectDog, dogGender option, etc.) */
function invitationToFormValues(
  invitation: IInvitationDoc | null | undefined,
  lang: 'he' | 'en',
): Record<string, unknown> {
  if (!invitation || !invitation.id) return { dogs: [] };
  const genderOptions = DISPLAY_TEXTS.genderOptions[lang];
  const dogs = (invitation.dogs ?? []).map((d) => {
    const genderOption =
      genderOptions.find((o) => o.value === d.dogGender) ?? null;
    return {
      selectDog: { value: d.id, label: d.dogName },
      dogName: d.dogName,
      dogGender: genderOption,
      dogBread: d.dogBread,
      dogAge: d.dogAge,
      dogPhysicalDescription: d.dogPhysicalDescription,
    };
  });
  return {
    ...invitation,
    status: invitation.status ?? 'draft',
    dogs,
  };
}

const InvitationPageInner = () => {
  const { data } = useInvitationPageContext();
  const { preferences } = useUserContext();
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const lang = (preferences?.lang ?? 'he') as 'he' | 'en';
  const formValues = useMemo(
    () => invitationToFormValues(data.currentInvitation, lang),
    [data.currentInvitation, lang],
  );
  const form = useForm({ defaultValues: formValues });
  const { reset } = form;

  useEffect(() => {
    reset(invitationToFormValues(data.currentInvitation, lang));
  }, [data.currentInvitation, lang, reset]);

  const onSave = useCallback(
    async (values: Record<string, unknown>) => {
      const invitationId = data.currentInvitation?.id;
      if (!invitationId) {
        showError('invitationNotLoaded');
        return;
      }
      try {
        // Edit mode: update only dates and dogs (owner and status stay unchanged)
        const payload = {
          id: invitationId,
          startDate: values.startDate,
          endDate: values.endDate,
          sHour: values.sHour,
          eHour: values.eHour,
          dogs: values.dogs,
        };
        const result = await axios.patch('/api/invitation/update', payload);
        if (!result.data.success) throw new Error(result.data.message);
        showSuccess('invitationUpdated');
        router.push('/app/invitations');
      } catch (err) {
        showError('invitationUpdateFailed', (err as Error).message);
      }
    },
    [data.currentInvitation?.id, showSuccess, showError, router],
  );

  return (
    <FormProvider {...form}>
      <IconButton
        aria-label='Back to invitations'
        onClick={() => router.push('/app/invitations')}
        sx={{ mb: 2 }}
      >
        <ArrowBackIcon
          sx={{
            transform: preferences.lang === 'he' ? 'scaleX(-1)' : 'none',
          }}
        />
      </IconButton>
      {!isEditMode && (
        <Button
          variant='contained'
          onClick={() => setIsEditMode(true)}
          sx={{ mb: 2 }}
        >
          {lang === 'he' ? 'ערוך' : 'Edit'}
        </Button>
      )}
      {isEditMode && (
        <Button
          variant='outlined'
          onClick={() => setIsEditMode(false)}
          sx={{ mb: 2, mr: 1 }}
        >
          {COMMON_DISPLAY_TEXTS[lang].buttons[EButtonTexts.Cancel]}
        </Button>
      )}
      <InvitationForm
        onFormSubmit={isEditMode ? onSave : () => {}}
        disabled={!isEditMode}
        submitLabel={
          isEditMode
            ? COMMON_DISPLAY_TEXTS[lang].buttons[EButtonTexts.Save]
            : undefined
        }
        editOnlyDatesAndDogs={isEditMode}
      />
    </FormProvider>
  );
};

const InvitationPage = () => {
  const router = useRouter();
  return (
    <InvitationPageProvider invitationId={router.query.invitationId as string}>
      <DogsProvider>
        <InvitationPageInner />
      </DogsProvider>
    </InvitationPageProvider>
  );
};

export default InvitationPage;

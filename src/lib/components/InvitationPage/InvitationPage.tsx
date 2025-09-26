import {
  InvitationPageProvider,
  useInvitationPageContext,
} from '@/lib/context/InvitationPageContext';
import { useRouter } from 'next/router';
import InvitationForm from '../InvitationForm';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useUserContext } from '@/lib/context/userContext';
import { DogsProvider } from '@/lib/context/userDogsContext';

const InvitationPageInner = () => {
  const { data } = useInvitationPageContext();
  const { preferences } = useUserContext();
  const router = useRouter();
  const form = useForm({ defaultValues: data.currentInvitation ?? {} });
  const { reset } = form;

  useEffect(() => {
    reset(data.currentInvitation);
  }, [data.currentInvitation, reset]);
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
      <InvitationForm onFormSubmit={() => {}} disabled />
    </FormProvider>
  );
};

const InvitationPage = () => {
  const router = useRouter();
  return (
    <DogsProvider>
      <InvitationPageProvider
        invitationId={router.query.invitationId as string}
      >
        <InvitationPageInner />
      </InvitationPageProvider>
    </DogsProvider>
  );
};

export default InvitationPage;

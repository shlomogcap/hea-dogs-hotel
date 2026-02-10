import InvitationForm from '@/lib/components/InvitationForm';
import SSRGuard from '@/lib/components/common/SSRGuard/SSRGuard';
import {
  CreateInvitationBody,
  IInvitationDoc,
} from '@/pages/api/invitation/create';
import { DogsProvider } from '@/lib/context/userDogsContext';
import { useToast } from '@/lib/hooks/useToast';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form-mui';

export default function NewInvitationRoute() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const onCreate = useCallback(
    async (values: IInvitationDoc) => {
      try {
        const result = await axios.post('/api/invitation/create', {
          ...values,
        } as CreateInvitationBody);
        if (!result.data.success) throw new Error(result.data.message);
        showSuccess('invitationCreated');
        router.push('/app/invitations');
      } catch (err) {
        showError('invitationCreateFailed', (err as Error).message);
      }
    },
    [router, showSuccess, showError],
  );
  const form = useForm({
    defaultValues: { dogs: [], status: 'draft' as const },
  });
  return (
    <DogsProvider>
      <SSRGuard>
        <FormProvider {...form}>
          <InvitationForm onFormSubmit={onCreate} />
        </FormProvider>
      </SSRGuard>
    </DogsProvider>
  );
}

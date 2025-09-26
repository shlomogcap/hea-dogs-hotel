import InvitationForm from '@/lib/components/InvitationForm';
import { CreateInvitationBody, IInvitationDoc } from '@/pages/api/dogs/create';
import axios from 'axios';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function NewInvitationRoute() {
  const onCreate = useCallback(async (values: IInvitationDoc) => {
    try {
      const result = await axios.post('/api/invitation/create', {
        ...values,
      } as CreateInvitationBody);
      if (!result.data.success) throw new Error(result.data.message);
      toast.success('Invitation Created successfully');
    } catch (err) {
      toast.error('Invitation Failed to create' + (err as Error).message);
    }
  }, []);
  const form = useForm({ defaultValues: {} });
  return (
    <FormProvider {...form}>
      <InvitationForm onFormSubmit={onCreate} />;
    </FormProvider>
  );
}

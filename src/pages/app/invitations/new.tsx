import InvitationForm from '@/lib/components/InvitationForm';
import { FormProvider, useForm } from 'react-hook-form-mui';

export default function NewInvitationRoute() {
  const form = useForm({ defaultValues: {} });
  return (
    <FormProvider {...form}>
      <InvitationForm />
    </FormProvider>
  );
}

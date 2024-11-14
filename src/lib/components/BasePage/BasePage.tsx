import { useUserContext } from '@/lib/context/userContext';
import { PropsWithChildren } from 'react';

export const BasePage = ({ children }: PropsWithChildren) => {
  const { preferences } = useUserContext();
  return <div dir={preferences?.lang === 'en' ? 'ltr' : 'rtl'}>{children}</div>;
};

export default BasePage;

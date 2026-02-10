import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useUserContext } from '@/lib/context/userContext';
import { ILang } from '@/lib/consts/displayTexts';

const ACCESS_DENIED_LABEL: Record<ILang, string> = {
  he: 'אין הרשאה לצפייה בדף זה',
  en: 'Access denied',
};

export type AdminGuardProps = PropsWithChildren<{
  accessDenied: boolean;
}>;

export const AdminGuard = ({ accessDenied, children }: AdminGuardProps) => {
  const { preferences } = useUserContext();
  const lang = (preferences?.lang ?? 'he') as ILang;

  if (accessDenied) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant='h6' color='text.secondary'>
          {ACCESS_DENIED_LABEL[lang]}
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};

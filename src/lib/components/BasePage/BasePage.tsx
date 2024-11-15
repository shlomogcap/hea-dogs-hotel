import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import { forwardRef, PropsWithChildren, useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import UserProfileForm from '../UserProfileForm';
import DialogTitle from '@mui/material/DialogTitle';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { ILang } from '@/lib/consts/displayTexts';
import { useUserContext } from '@/lib/context/userContext';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

enum ERoutes {
  Dogs = '/app/dogs',
  Inivitations = '/app/invitations',
  NewInvitation = '/app/invitations/new',
}

const DISPLAY_TEXTS: Record<ILang, Record<ERoutes, string>> = {
  he: {
    [ERoutes.Dogs]: 'פרטי כלבים',
    [ERoutes.Inivitations]: 'ההזמנות שלי',
    [ERoutes.NewInvitation]: 'הזמנת מקום לפנסיון',
  },
  en: {
    [ERoutes.Dogs]: 'My Dogs',
    [ERoutes.Inivitations]: 'My Invitations',
    [ERoutes.NewInvitation]: 'New Invitation',
  },
};

const MainAddButton = () => {
  const router = useRouter();
  const handleAddInvitation = () => {
    router.push(ERoutes.NewInvitation);
  };

  return (
    <SpeedDial
      ariaLabel='Add An Invitation'
      sx={{ position: 'fixed', bottom: 16, insetInlineEnd: 16 }}
      icon={<SpeedDialIcon />}
      onClick={handleAddInvitation}
      open={false} // Keeps the SpeedDial from expanding
    />
  );
};

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
  ) => <Slide direction='up' ref={ref} {...props} />,
);

export const BasePage = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { preferences } = useUserContext();
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  return (
    <div dir={preferences?.lang === 'en' ? 'ltr' : 'rtl'}>
      <Dialog
        fullScreen
        open={userProfileOpen}
        TransitionComponent={Transition}
        disableEscapeKeyDown={false}
        onClose={() => setUserProfileOpen(false)}
      >
        <DialogTitle alignContent={'end'}>
          <IconButton
            color='inherit'
            onClick={() => setUserProfileOpen(false)}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <UserProfileForm />
        </DialogContent>
      </Dialog>
      <AppBar>
        <Toolbar>
          <Tabs
            sx={{ flexGrow: 1 }}
            value={router.asPath}
            onChange={(evt, v) => router.push(v)}
            textColor='inherit'
          >
            {Object.values(ERoutes).map((route) => (
              <Tab key={route} value={route} label={DISPLAY_TEXTS.he[route]} />
            ))}
          </Tabs>
          <IconButton onClick={() => setUserProfileOpen(true)}>
            <AccountCircleIcon sx={{ color: 'white' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main style={{ marginTop: 68.5, padding: 24 }}>{children}</main>
      <MainAddButton />
    </div>
  );
};

export default BasePage;

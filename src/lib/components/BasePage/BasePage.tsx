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
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PetsIcon from '@mui/icons-material/Pets';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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

const ROUTE_ICONS: Record<ERoutes, JSX.Element> = {
  [ERoutes.Dogs]: <PetsIcon />,
  [ERoutes.Inivitations]: <EventNoteIcon />,
  [ERoutes.NewInvitation]: <AddCircleOutlineIcon />,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
          <UserProfileForm onClose={() => setUserProfileOpen(false)} />
        </DialogContent>
      </Dialog>
      <AppBar>
        <Toolbar>
          {!isMobile ? (
            <>
              <Tabs
                sx={{ flexGrow: 1 }}
                value={
                  Object.values(ERoutes).includes(router.asPath as ERoutes)
                    ? router.asPath
                    : false
                }
                onChange={(evt, v) => router.push(v)}
                textColor='inherit'
              >
                {Object.values(ERoutes).map((route) => (
                  <Tab
                    key={route}
                    value={route}
                    label={DISPLAY_TEXTS[preferences?.lang || 'he'][route]}
                  />
                ))}
              </Tabs>
              <IconButton onClick={() => setUserProfileOpen(true)}>
                <AccountCircleIcon sx={{ color: 'white' }} />
              </IconButton>
            </>
          ) : (
            <div
              style={{
                width: '100%',
                textAlign: 'center',
                fontWeight: 500,
                fontSize: 20,
              }}
            >
              {DISPLAY_TEXTS[preferences?.lang || 'he'][
                router.asPath as ERoutes
              ] || ''}
            </div>
          )}
        </Toolbar>
      </AppBar>
      {isMobile && (
        <BottomNavigation
          showLabels={false}
          value={
            Object.values(ERoutes).includes(router.asPath as ERoutes)
              ? router.asPath
              : false
          }
          onChange={(evt, v) => {
            if (v === 'profile') setUserProfileOpen(true);
            else router.push(v);
          }}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.appBar,
          }}
        >
          {Object.values(ERoutes).map((route) => (
            <BottomNavigationAction
              key={route}
              value={route}
              icon={ROUTE_ICONS[route]}
            />
          ))}
          <BottomNavigationAction
            icon={<AccountCircleIcon />}
            value='profile'
          />
        </BottomNavigation>
      )}
      <main
        style={{
          marginTop: 68.5,
          marginBottom: isMobile ? 56 : 0,
          padding: 24,
        }}
      >
        {children}
      </main>
      {!isMobile && <MainAddButton />}
    </div>
  );
};

export default BasePage;

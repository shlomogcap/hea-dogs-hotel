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
import { ILang } from '@/lib/consts/displayTexts';
import { useUserContext } from '@/lib/context/userContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
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
  NewDog = '/app/dogs/new',
  Inivitations = '/app/invitations',
  NewInvitation = '/app/invitations/new',
}

/** Routes that appear as main tabs (New Dog is only reachable from Dogs page) */
const MAIN_TAB_ROUTES: ERoutes[] = [
  ERoutes.Dogs,
  ERoutes.Inivitations,
  ERoutes.NewInvitation,
];

const getSelectedTab = (pathname: string): ERoutes | false => {
  const path = pathname.split('?')[0];
  if (path.startsWith(ERoutes.Dogs)) return ERoutes.Dogs;
  if (path === ERoutes.NewInvitation) return ERoutes.NewInvitation;
  if (path.startsWith(ERoutes.Inivitations)) return ERoutes.Inivitations;
  return false;
};

const DISPLAY_TEXTS: Record<ILang, Record<ERoutes, string>> = {
  he: {
    [ERoutes.Dogs]: 'פרטי כלבים',
    [ERoutes.NewDog]: 'הוספת כלב',
    [ERoutes.Inivitations]: 'ההזמנות שלי',
    [ERoutes.NewInvitation]: 'הזמנת מקום לפנסיון',
  },
  en: {
    [ERoutes.Dogs]: 'My Dogs',
    [ERoutes.NewDog]: 'New Dog',
    [ERoutes.Inivitations]: 'My Invitations',
    [ERoutes.NewInvitation]: 'New Invitation',
  },
};

const ROUTE_ICONS: Record<ERoutes, JSX.Element> = {
  [ERoutes.Dogs]: <PetsIcon />,
  [ERoutes.NewDog]: <AddCircleOutlineIcon />,
  [ERoutes.Inivitations]: <EventNoteIcon />,
  [ERoutes.NewInvitation]: <AddCircleOutlineIcon />,
};

const SIGN_OUT_LABEL: Record<ILang, string> = {
  he: 'התנתק',
  en: 'Sign out',
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
          <Button
            startIcon={<LogoutIcon />}
            color='error'
            onClick={() => {
              signOut(auth);
              setUserProfileOpen(false);
            }}
            sx={{ mt: 3 }}
            fullWidth
          >
            {SIGN_OUT_LABEL[preferences?.lang ?? 'he']}
          </Button>
        </DialogContent>
      </Dialog>
      <AppBar>
        <Toolbar>
          {!isMobile ? (
            <>
              <Tabs
                sx={{ flexGrow: 1 }}
                value={getSelectedTab(router.asPath)}
                onChange={(evt, v) => router.push(v)}
                textColor='inherit'
              >
                {MAIN_TAB_ROUTES.map((route) => (
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
          value={getSelectedTab(router.asPath)}
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
          {MAIN_TAB_ROUTES.map((route) => (
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
    </div>
  );
};

export default BasePage;

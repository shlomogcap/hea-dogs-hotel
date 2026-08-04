import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import { forwardRef, PropsWithChildren, useState, type JSX } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import UserProfileForm from '../UserProfileForm';
import DialogTitle from '@mui/material/DialogTitle';
import { ILang } from '@/lib/consts/displayTexts';
import { useUserContext } from '@/lib/context/userContext';
import { useIsAdmin } from '@/lib/hooks/useIsAdmin';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Tabs from '@mui/material/Tabs';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

enum ERoutes {
  Home = '/app',
  Dogs = '/app/dogs',
  NewDog = '/app/dogs/new',
  Inivitations = '/app/invitations',
  NewInvitation = '/app/invitations/new',
  AdminInvitations = '/app/admin/invitations',
  AdminDogs = '/app/admin/dogs',
}

/** User app tabs (no admin) */
const USER_TAB_ROUTES: ERoutes[] = [
  ERoutes.Home,
  ERoutes.Dogs,
  ERoutes.Inivitations,
  ERoutes.NewInvitation,
];

/** Admin panel tabs only */
const ADMIN_TAB_ROUTES: ERoutes[] = [
  ERoutes.AdminInvitations,
  ERoutes.AdminDogs,
];

const getSelectedTab = (pathname: string): ERoutes | false => {
  const path = pathname.split('?')[0];
  if (path === '/app' || path === '/app/') return ERoutes.Home;
  if (path.startsWith(ERoutes.Dogs) && !path.startsWith('/app/admin'))
    return ERoutes.Dogs;
  if (path === ERoutes.NewInvitation) return ERoutes.NewInvitation;
  if (path.startsWith(ERoutes.Inivitations)) return ERoutes.Inivitations;
  if (path.startsWith('/app/admin/invitations'))
    return ERoutes.AdminInvitations;
  if (path.startsWith('/app/admin/dogs')) return ERoutes.AdminDogs;
  return false;
};

const DISPLAY_TEXTS: Record<ILang, Record<ERoutes, string>> = {
  he: {
    [ERoutes.Home]: 'בית',
    [ERoutes.Dogs]: 'פרטי כלבים',
    [ERoutes.NewDog]: 'הוספת כלב',
    [ERoutes.Inivitations]: 'ההזמנות שלי',
    [ERoutes.NewInvitation]: 'הזמנת מקום לפנסיון',
    [ERoutes.AdminInvitations]: 'ניהול הזמנות',
    [ERoutes.AdminDogs]: 'כל הכלבים',
  },
  en: {
    [ERoutes.Home]: 'Home',
    [ERoutes.Dogs]: 'My Dogs',
    [ERoutes.NewDog]: 'New Dog',
    [ERoutes.Inivitations]: 'My Invitations',
    [ERoutes.NewInvitation]: 'New Invitation',
    [ERoutes.AdminInvitations]: 'Admin – Invitations',
    [ERoutes.AdminDogs]: 'All Dogs',
  },
};

const ROUTE_ICONS: Record<ERoutes, JSX.Element> = {
  [ERoutes.Home]: <HomeIcon />,
  [ERoutes.Dogs]: <PetsIcon />,
  [ERoutes.NewDog]: <AddCircleOutlineIcon />,
  [ERoutes.Inivitations]: <EventNoteIcon />,
  [ERoutes.NewInvitation]: <AddCircleOutlineIcon />,
  [ERoutes.AdminInvitations]: <AdminPanelSettingsIcon />,
  [ERoutes.AdminDogs]: <PetsIcon />,
};

const SIGN_OUT_LABEL: Record<ILang, string> = {
  he: 'התנתק',
  en: 'Sign out',
};

const ADMIN_PANEL_SWITCH_LABEL: Record<ILang, string> = {
  he: 'ממשק ניהול',
  en: 'Admin panel',
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
  const { isAdmin } = useIsAdmin();
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isAdminPanel = router.pathname.startsWith('/app/admin');
  const tabRoutes = isAdminPanel ? ADMIN_TAB_ROUTES : USER_TAB_ROUTES;

  const handleAdminSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      router.push('/app/admin/invitations');
    } else {
      router.push('/app/invitations');
    }
  };
  return (
    <div dir={preferences?.lang === 'en' ? 'ltr' : 'rtl'}>
      <Dialog
        fullScreen
        open={userProfileOpen}
        slots={{ transition: Transition }}
        onClose={() => setUserProfileOpen(false)}
      >
        <DialogTitle sx={{ textAlign: 'end' }}>
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
      <AppBar color={isAdminPanel ? 'success' : 'primary'}>
        <Toolbar>
          {!isMobile ? (
            <>
              <Tabs
                sx={{
                  flexGrow: 1,
                  '& .MuiTabs-indicator': {
                    backgroundColor: 'white',
                  },
                }}
                value={getSelectedTab(router.asPath)}
                onChange={(evt, v) => router.push(v)}
                textColor='inherit'
              >
                {tabRoutes.map((route) => (
                  <Tab
                    key={route}
                    value={route}
                    sx={{
                      minWidth: route === ERoutes.Home ? 'auto' : undefined,
                    }}
                    label={
                      route === ERoutes.Home
                        ? ROUTE_ICONS[route]
                        : DISPLAY_TEXTS[preferences?.lang || 'he'][route]
                    }
                    aria-label={
                      route === ERoutes.Home
                        ? DISPLAY_TEXTS[preferences?.lang || 'he'][route]
                        : undefined
                    }
                  />
                ))}
              </Tabs>
              {isAdmin && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={isAdminPanel}
                      onChange={handleAdminSwitch}
                      color='default'
                      size='small'
                    />
                  }
                  label={ADMIN_PANEL_SWITCH_LABEL[preferences?.lang ?? 'he']}
                  sx={{ color: 'white', m: 1.5 }}
                />
              )}
              <IconButton onClick={() => setUserProfileOpen(true)}>
                <AccountCircleIcon sx={{ color: 'white' }} />
              </IconButton>
            </>
          ) : (
            <>
              {isAdmin && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={isAdminPanel}
                      onChange={handleAdminSwitch}
                      color='default'
                      size='small'
                    />
                  }
                  label={ADMIN_PANEL_SWITCH_LABEL[preferences?.lang ?? 'he']}
                  sx={{ color: 'white', flexShrink: 0 }}
                />
              )}
              <div
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontWeight: 500,
                  fontSize: 20,
                }}
              >
                {DISPLAY_TEXTS[preferences?.lang || 'he'][
                  router.asPath as ERoutes
                ] || ''}
              </div>
              <IconButton
                onClick={() => setUserProfileOpen(true)}
                sx={{ flexShrink: 0 }}
              >
                <AccountCircleIcon sx={{ color: 'white' }} />
              </IconButton>
            </>
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
          {tabRoutes.map((route) => (
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

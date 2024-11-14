import BasePage from '../BasePage';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import { forwardRef, useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import UserProfileForm from '../UserProfileForm';
import DialogTitle from '@mui/material/DialogTitle';

const pages = [
  { route: 'dogs', title: 'My Dogs' },
  { route: 'invitation', title: 'My Invitations' },
];

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
  ) => <Slide direction='up' ref={ref} {...props} />,
);

export const HomePage = () => {
  const router = useRouter();
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  return (
    <BasePage>
      <Dialog
        fullScreen
        open={userProfileOpen}
        TransitionComponent={Transition}
      >
        <DialogTitle alignContent={'end'}>
          <IconButton
            sx={{ position: 'a' }}
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ route, title }) => (
              <Button
                key={route}
                onClick={() => router.push(route)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {title}
              </Button>
            ))}
          </Box>
          <IconButton onClick={() => setUserProfileOpen(true)}>
            <AccountCircleIcon sx={{ color: 'white' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </BasePage>
  );
};

export default HomePage;

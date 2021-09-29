import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import {
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import Link from '@/components/misc/Link';
import Logo from '@/components/misc/Logo';
import { useState, ReactElement } from 'react';
import Router from 'next/router';

interface Props {
  isApp?: boolean;
  toggleNavigationDrawer?: () => void;
}

const NavigationBar = ({ isApp, toggleNavigationDrawer }: Props): ReactElement => {
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout().then(() => {
      handleClose();
      Router.push('/login');
    });
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ bgcolor: 'background.paper', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Container maxWidth={isApp ? false : 'lg'}>
          <Toolbar
            sx={{ justifyContent: 'space-between', height: '64px' }}
            disableGutters
          >
            {user && isApp ? (
              <IconButton
                aria-label="delete"
                size="large"
                onClick={toggleNavigationDrawer}
                sx={{ display: { sx: 'flex', md: 'none' } }}
              >
                <MenuIcon fontSize="inherit" />
              </IconButton>
            ) : (
              <></>
            )}
            <Logo expanded sx={{ py: 1, height: 0.9 }} />
            {user ? (
              isApp ? (
                <>
                  <Box sx={{ height: 1, p: 0.5 }}>
                    <IconButton sx={{ height: 1 }} onClick={handleClick}>
                      <Avatar
                        src={user?.profilePicture}
                        sx={{ height: 1, borderRadius: '50%', border: 1 }}
                      />
                    </IconButton>
                  </Box>
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem sx={{ p: 0 }}>
                      <Link
                        href="/profile"
                        sx={{
                          textDecoration: 'none',
                          color: 'text.primary',
                          width: 1,
                          py: '6px',
                          px: 2,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <ListItemIcon>
                          <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem sx={{ p: 0 }}>
                      <Link
                        href="/account"
                        sx={{
                          textDecoration: 'none',
                          color: 'text.primary',
                          width: 1,
                          py: '6px',
                          px: 2,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <ListItemIcon>
                          <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        Account & Settings
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Link href="/home" passHref sx={{ textDecoration: 'none' }}>
                  <Button color="primary" variant="contained">
                    Go to the app
                  </Button>
                </Link>
              )
            ) : (
              <Box>
                <Link href="/home" passHref sx={{ textDecoration: 'none', mr: 1 }}>
                  <Button color="primary">Login</Button>
                </Link>
                <Link href="/signup" passHref sx={{ textDecoration: 'none' }}>
                  <Button color="primary" variant="contained">
                    Sign up
                  </Button>
                </Link>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavigationBar;

import { useState, ReactElement } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';
import {
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';
import Logo from '@/components/general/Logo';
import ProfilePicture from '@/components/general/ProfilePicture';
import { useAuth } from '@/utils/auth';
import { useRouter } from 'next/router';
import Link from '@/components/general/Link';

const AppNavigationBar = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'background.paper',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{ justifyContent: 'space-between', height: '64px' }}
          disableGutters
        >
          <Logo expanded sx={{ pl: 2, py: 1, height: 1 }} />
          <Box sx={{ height: 1, p: 0.5 }}>
            <IconButton sx={{ height: 1 }} onClick={handleClick}>
              <ProfilePicture
                sx={{ height: 1, borderRadius: '50%', border: 1 }}
              />
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
          >
            <MenuItem component={Link} href={`/users/${currentUser?.uid}`}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem component={Link} href="/settings">
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Account & Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppNavigationBar;

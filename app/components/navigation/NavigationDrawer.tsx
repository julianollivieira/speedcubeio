import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Backdrop,
  SvgIcon,
} from '@mui/material';
import {
  Home as HomeIcon,
  Timer as TimerIcon,
  AllInbox as AllInboxIcon,
  Settings as SettingsIcon,
  Newspaper as NewspaperIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { ReactElement } from 'react';
import DiscordIcon from '../../../public/images/icons/discord.svg';

const drawerWidth = 240;

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `0px`,
  [theme.breakpoints.up('md')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: { theme: any; open: any }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface Props {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

const NavigationDrawer = ({
  open,
  handleDrawerOpen,
  handleDrawerClose,
}: Props): ReactElement => {
  const theme = useTheme();

  return (
    <>
      <Backdrop
        open={open}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        onClick={handleDrawerClose}
      />
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        theme={theme}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        PaperProps={{ sx: { zIndex: (theme) => theme.zIndex.drawer + 2 } }}
      >
        <List sx={{ pt: '64px', flex: 1 }}>
          <Link href="/home" passHref>
            <ListItem button component="a" key="Home">
              <ListItemIcon sx={{ paddingLeft: 1 }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link href="/timer" passHref>
            <ListItem button component="a" key="Timer">
              <ListItemIcon sx={{ paddingLeft: 1 }}>
                <TimerIcon />
              </ListItemIcon>
              <ListItemText primary="Timer" />
            </ListItem>
          </Link>
          <Link href="/boxes" passHref>
            <ListItem button component="a" key="Boxes">
              <ListItemIcon sx={{ paddingLeft: 1 }}>
                <AllInboxIcon />
              </ListItemIcon>
              <ListItemText primary="Boxes" />
            </ListItem>
          </Link>
          <Link href="/news" passHref>
            <ListItem button component="a" key="News">
              <ListItemIcon sx={{ paddingLeft: 1 }}>
                <NewspaperIcon />
              </ListItemIcon>
              <ListItemText primary="News" />
            </ListItem>
          </Link>
          <Link href="/preferences" passHref>
            <ListItem button component="a" key="Preferences">
              <ListItemIcon sx={{ paddingLeft: 1 }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Preferences" />
            </ListItem>
          </Link>
        </List>
        <List>
          <ListItem
            button
            component="a"
            key="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/speedcube.io/"
          >
            <ListItemIcon sx={{ paddingLeft: 1 }}>
              <InstagramIcon />
            </ListItemIcon>
            <ListItemText primary="Instagram" />
          </ListItem>
          <ListItem
            button
            component="a"
            key="Discord"
            target="_blank"
            rel="noopener noreferrer"
            href="https://discord.gg/UndeZPdTcX"
          >
            <ListItemIcon sx={{ paddingLeft: 1 }}>
              <SvgIcon
                sx={{ height: 1, fill: '#FFF' }}
                viewBox="0 0 71 55"
                component={DiscordIcon}
              />
            </ListItemIcon>
            <ListItemText primary="Discord" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default NavigationDrawer;

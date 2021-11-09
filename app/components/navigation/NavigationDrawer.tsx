import {
  Drawer as MuiDrawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Backdrop,
} from '@mui/material';
import {
  Home as HomeIcon,
  Timer as TimerIcon,
  AllInbox as AllInboxIcon,
  ShowChart as ShowChartIcon,
  Settings as SettingsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  MultilineChart as MultilineChartIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ReactElement } from 'react';

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
        sx={{ color: '#fff', zIndex: 1 }}
        onClick={handleDrawerClose}
      />
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        theme={theme}
      >
        <List sx={{ pt: '64px' }}>
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
          <Link href="/statistics" passHref>
            <ListItem button component="a" key="Statistics">
              <ListItemIcon sx={{ paddingLeft: 1 }}>
                <ShowChartIcon />
              </ListItemIcon>
              <ListItemText primary="Statistics" />
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
      </Drawer>
    </>
  );
};

export default NavigationDrawer;

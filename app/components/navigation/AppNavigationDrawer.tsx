import { ReactElement, useState } from 'react';
import Link from '@/components/general/Link';
import {
  Drawer as MuiDrawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Badge,
  Collapse,
} from '@material-ui/core';
import {
  Home as HomeIcon,
  Timer as TimerIcon,
  AllInbox as AllInboxIcon,
  ShowChart as ShowChartIcon,
  Settings as SettingsIcon,
  Inbox as InboxIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  MultilineChart as MultilineChartIcon,
  People as PeopleIcon,
} from '@material-ui/icons';
import { styled } from '@material-ui/core/styles';

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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')((theme: any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

const AppNavigationDrawer = (props: any): ReactElement => {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const toggleAdminPanelOpen = () => setAdminPanelOpen(!adminPanelOpen);

  return (
    <Drawer
      variant="permanent"
      open={open}
      onMouseEnter={handleDrawerOpen}
      onMouseLeave={handleDrawerClose}
      {...props}
    >
      <Toolbar />
      <Divider />
      <List>
        <ListItem button key="Home" component={Link} href="/home">
          <ListItemIcon sx={{ paddingLeft: 1 }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button key="Timer" component={Link} href="/timer">
          <ListItemIcon sx={{ paddingLeft: 1 }}>
            <TimerIcon />
          </ListItemIcon>
          <ListItemText primary="Timer" />
        </ListItem>
        <ListItem button key="Boxes" component={Link} href="/boxes">
          <ListItemIcon sx={{ paddingLeft: 1 }}>
            <AllInboxIcon />
          </ListItemIcon>
          <ListItemText primary="Boxes" />
        </ListItem>
        <ListItem button key="Statistics" component={Link} href="/statistics">
          <ListItemIcon sx={{ paddingLeft: 1 }}>
            <ShowChartIcon />
          </ListItemIcon>
          <ListItemText primary="Statistics" />
        </ListItem>
        <ListItem button key="Preferences" component={Link} href="/preferences">
          <ListItemIcon sx={{ paddingLeft: 1 }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Preferences" />
        </ListItem>
        {true ? (
          <>
            <Divider sx={{ my: 1 }} />
            <ListItem button key="Admin" onClick={toggleAdminPanelOpen}>
              <ListItemIcon sx={{ paddingLeft: 1 }}>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Admin" />
              {adminPanelOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={adminPanelOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  component={Link}
                  href="/admin"
                  sx={{ pl: open ? 4 : 3 }}
                >
                  <ListItemIcon>
                    <MultilineChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Overview" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  href="/admin/users"
                  sx={{ pl: open ? 4 : 3 }}
                >
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItem>
              </List>
            </Collapse>
          </>
        ) : (
          ''
        )}
      </List>
      <Divider sx={{ marginTop: 'auto' }} />
      <List>
        <ListItem button key="Messages" component={Link} href="/messages">
          <ListItemIcon sx={{ paddingLeft: 1 }}>
            <Badge badgeContent={1} color="primary">
              <InboxIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AppNavigationDrawer;

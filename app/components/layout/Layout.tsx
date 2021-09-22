import Head from 'next/head';
import Router from 'next/router';
import { ReactNode, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import NavigationBar from '@/components/navigation/NavigationBar';
import NavigationDrawer from '@/components/navigation/NavigationDrawer';
import { useAuth } from '@/hooks/useAuth';
import useLocalStorage from '@/hooks/useLocalStorage';

interface Props {
  title?: string;
  children: ReactNode;
  allowUnauthenticated?: boolean;
  isApp?: boolean;
}

const Layout = ({ title, children, allowUnauthenticated, isApp }: Props) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user === null && !allowUnauthenticated) {
      Router.push('/login');
    }
  }, [user]);

  const [open, setOpen] = useLocalStorage('drawerOpen', false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const toggleNavigationDrawer = () => setOpen(!open);

  return user || (allowUnauthenticated && user !== undefined) ? (
    <>
      <Head>
        <title>{title ? `${title} | ` : ''}Speedcube.io</title>
      </Head>
      <NavigationBar isApp={isApp} toggleNavigationDrawer={toggleNavigationDrawer} />
      {user && isApp ? (
        <NavigationDrawer
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
      ) : (
        <></>
      )}
      <Box>{children}</Box>
    </>
  ) : (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Layout;

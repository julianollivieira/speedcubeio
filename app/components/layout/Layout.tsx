import Head from 'next/head';
import { ReactElement, ReactNode, useEffect } from 'react';
import { Box, Container, Theme, useMediaQuery } from '@mui/material';
import useLocalStorage from '@/hooks/useLocalStorage';
import NavigationBar from '@/components/navigation/NavigationBar';
import NavigationDrawer from '@/components/navigation/NavigationDrawer';
import { useData } from '@/hooks/useData';
import Router from 'next/router';

type Props = {
  fluid?: boolean;
  isNotApp?: boolean;
  title?: string;
  children: ReactNode;
  allowUnauthorized?: boolean;
};

const Layout = ({
  fluid,
  isNotApp,
  title,
  children,
  allowUnauthorized = false,
}: Props): ReactElement => {
  const [open, setOpen] = useLocalStorage('drawerOpen', false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const toggleNavigationDrawer = () => setOpen(!open);
  const { user } = useData();

  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  useEffect(() => {
    if (user === null && !allowUnauthorized) {
      Router.push('/login');
    }
  }, [user]);

  useEffect(() => {
    if (!matches && open) {
      handleDrawerClose();
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title ? `${title} | ` : ''}Speedcube.io</title>
      </Head>
      <NavigationBar
        isNotApp={isNotApp}
        toggleNavigationDrawer={toggleNavigationDrawer}
      />
      {user && !isNotApp && (
        <NavigationDrawer
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
      )}
      <Container fixed={!fluid && matches} sx={{ pt: '64px' }} maxWidth={false}>
        <Box sx={{ px: { md: '73px' } }}>{children}</Box>
      </Container>
      {/* Add circular progress when loading user/boxes/profile? */}
    </>
  );
};

export default Layout;

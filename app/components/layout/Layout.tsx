import Head from 'next/head';
import { ReactElement, ReactNode, useEffect } from 'react';
import { Box } from '@mui/material';
import useLocalStorage from '@/hooks/useLocalStorage';
import NavigationBar from '@/components/navigation/NavigationBar';
import NavigationDrawer from '@/components/navigation/NavigationDrawer';
import { useData } from '@/hooks/useData';
import Router from 'next/router';

type Props = {
  title?: string;
  children: ReactNode;
};

const Layout = ({ title, children }: Props): ReactElement => {
  const [open, setOpen] = useLocalStorage('drawerOpen', false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const toggleNavigationDrawer = () => setOpen(!open);
  const { user } = useData();

  useEffect(() => {
    if (user === null) {
      Router.push('/login');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>{title ? `${title} | ` : ''}Speedcube.io</title>
      </Head>
      <NavigationBar isApp={true} toggleNavigationDrawer={toggleNavigationDrawer} />
      <NavigationDrawer
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <Box>{children}</Box>
    </>
  );
};

export default Layout;

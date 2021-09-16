import { ReactNode, ReactElement, useState } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import AppNavigationBar from '@/components/navigation/AppNavigationBar';
import NavigationDrawer from '@/components/navigation/AppNavigationDrawer';
import { useAuth } from '@/utils/auth';
import Head from 'next/head';
// import { useRouter } from 'next/router';

interface Props {
  disablePadding?: boolean;
  title?: string | null;
  children: ReactNode;
  sx?: any;
}

const Layout = (props: Props): ReactElement => {
  const { title, children, ...other } = props;
  const { currentUser } = useAuth();
  // const router = useRouter();

  if (!currentUser) {
    // if (process.browser) {
    //   router.push('/login');
    // }

    return (
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
  }

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const toggleNavigationDrawer = () => setOpen(!open);

  return (
    <>
      <Head>
        <title>{title ? `${title} | ` : ''}Speedcube.io</title>
      </Head>
      <AppNavigationBar toggleNavigationDrawer={toggleNavigationDrawer} />
      <NavigationDrawer
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <Box {...other} onClick={handleDrawerClose}>
        <Box sx={props.disablePadding ? {} : { pt: 5, px: 2 }}>{children}</Box>
      </Box>
    </>
  );
};

export default Layout;

import { ReactNode, ReactElement } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import AppNavigationBar from '@/components/navigation/AppNavigationBar';
import NavigationDrawer from '@/components/navigation/AppNavigationDrawer';
import { useAuth } from '@/utils/auth';
import Head from 'next/head';

interface Props {
  title?: string | null;
  children: ReactNode;
  sx?: any;
}

const Layout = (props: Props): ReactElement => {
  const { title, children, ...other } = props;
  const { currentUser } = useAuth();

  if (!currentUser) {
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

  return (
    <>
      <Head>
        <title>{title ? `${title} | ` : ''}Speedcube.io</title>
      </Head>
      <AppNavigationBar />
      <NavigationDrawer sx={{ display: { xs: 'none', md: 'flex' } }} />
      <Box {...other}>
        <Box sx={{ pt: 5, px: 2 }}>{children}</Box>
      </Box>
    </>
  );
};

export default Layout;

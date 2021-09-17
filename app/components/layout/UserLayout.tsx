import { ReactNode, ReactElement, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import AppNavigationBar from '@/components/navigation/AppNavigationBar';
import NavigationDrawer from '@/components/navigation/AppNavigationDrawer';
import { useAuth } from '@/utils/auth';
import Head from 'next/head';

interface Props {
  disablePadding?: boolean;
  title?: string | null;
  children: ReactNode;
  sx?: any;
}

const Layout = (props: Props): ReactElement => {
  const { title, children, ...other } = props;
  const { currentUser } = useAuth();

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const toggleNavigationDrawer = () => setOpen(!open);

  return (
    <>
      {currentUser ? (
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
            <Box sx={props.disablePadding ? {} : { pt: 5, px: 2 }}>
              {children}
            </Box>
          </Box>
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
      )}
    </>
  );
};

export default Layout;

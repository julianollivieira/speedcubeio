import type { NextPage } from 'next';
import Router from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Box, CircularProgress, Container } from '@mui/material';
import SignupForm from '@/components/auth/SignupForm';
import Logo from '@/components/misc/Logo';
import Link from '@/components/misc/Link';

const SignupPage: NextPage = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user !== null && user !== undefined) {
      Router.push('/home');
    }
  }, [user]);

  return (
    <>
      {user === null ? (
        <>
          <Head>
            <title>Sign up | Speedcube.io</title>
          </Head>
          <Container
            maxWidth="xs"
            sx={{
              height: { xs: '100vh', sm: '80vh' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ py: 7, display: { xs: 'none', sm: 'flex' } }}>
              <Link href="/" passHref>
                <Logo sx={{ height: { xs: 150, sm: 200 } }} />
              </Link>
            </Box>
            <SignupForm />
          </Container>
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

export default SignupPage;

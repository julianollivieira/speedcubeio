import { Box, CircularProgress, Container } from '@mui/material';
import Head from 'next/head';
import Link from '@/components/misc/Link';
import Logo from '@/components/misc/Logo';
import type { NextPage } from 'next';
import Router from 'next/router';
import SignupForm from '@/components/auth/SignupForm';
import { useData } from '@/hooks/useData';
import { useEffect } from 'react';

const SignupPage: NextPage = () => {
  const { user } = useData();

  useEffect(() => {
    if (user !== null && user !== undefined) {
      Router.push('/home');
    }
  }, [user]);

  return user === null ? (
    <>
      <Head>
        <title>Sign up | Speedcube.io</title>
      </Head>
      <Container
        maxWidth="xs"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: { xs: '100vh', sm: '80vh' },
          justifyContent: 'center',
        }}
      >
        <Box sx={{ py: 7, display: { xs: 'none', sm: 'flex' } }}>
          <Link href="/" passHref>
            <Logo sx={{ height: { sm: 150, md: 200 } }} />
          </Link>
        </Box>
        <SignupForm />
      </Container>
    </>
  ) : (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        width: '100vw',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default SignupPage;

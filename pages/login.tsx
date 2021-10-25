import type { NextPage } from 'next';
import Router from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';
import { Box, CircularProgress, Container, Button } from '@mui/material';
import LoginForm from '@/components/auth/LoginForm';
import Logo from '@/components/misc/Logo';
import Link from '@/components/misc/Link';
import { useData } from '@/hooks/useData';

const LoginPage: NextPage = () => {
  const { user } = useData();

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
            <title>Log in | Speedcube.io</title>
          </Head>
          <Container
            maxWidth="xs"
            sx={{
              height: { xs: '90vh', sm: '80vh' },
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
            <LoginForm />
            <Link href="/forgot-password" passHref sx={{ mt: 3, textDecoration: 'none' }}>
              <Button color="primary">Forgot your password?</Button>
            </Link>
            <Link
              href="/resend-email-verification"
              passHref
              sx={{ textDecoration: 'none' }}
            >
              <Button color="primary">Resend email verification</Button>
            </Link>
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

export default LoginPage;

import type { NextPage } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';
import { Container, Box, Button } from '@material-ui/core';
import LoginForm from '@/components/login/LoginForm';
import Link from '@/components/general/Link';
import Logo from '@/components/general/Logo';

const Login: NextPage = (): ReactElement => {
  return (
    <>
      <Head>
        <title>Log in | Speedcube.io</title>
      </Head>
      <Box
        sx={{
          position: 'absolute',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          my: 2,
        }}
      >
        <Link href="/">
          <Logo sx={{ height: 200 }} />
        </Link>
      </Box>
      <Container
        maxWidth="xs"
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoginForm />
      </Container>

      {/* <Container
        maxWidth="xs"
        sx={{
          height: '75vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link href="/">
          <Logo sx={{ height: 200, mb: 10 }} />
        </Link>
        <LoginForm />
        <Button
          component={Link}
          href="/forgot-my-password"
          sx={{ mt: 3 }}
          color="primary"
        >
          Forgot your password?
        </Button>
      </Container> */}
    </>
  );
};

export default Login;

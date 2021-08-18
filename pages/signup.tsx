import type { NextPage } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';
import { Container, Box } from '@material-ui/core';
import SignupForm from '@/components/signup/SignupForm';
import Link from '@/components/general/Link';

const Signup: NextPage = (): ReactElement => {
  return (
    <>
      <Head>
        <title>Sign up | Speedcube.io</title>
      </Head>
      <Container
        maxWidth="xs"
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link href="/">
          <Box
            component="img"
            src="/images/logos/black_logo_big.png"
            alt="Speedcube.io logo"
            sx={{ width: 1, mb: 5 }}
          />
        </Link>
        <SignupForm />
      </Container>
    </>
  );
};

export default Signup;

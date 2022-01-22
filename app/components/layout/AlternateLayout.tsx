import { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import Logo from '@/components/misc/Logo';
import Link from '@/components/misc/Link';

interface Props {
  title: string;
  children: ReactNode;
}

const AlternateLayout = ({ title, children }: Props): ReactElement => {
  return (
    <>
      <Head>
        <title>{title} | Speedcube.io</title>
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
            <Logo sx={{ height: { sm: 150, md: 200 } }} />
          </Link>
        </Box>
        {children}
      </Container>
    </>
  );
};

export default AlternateLayout;

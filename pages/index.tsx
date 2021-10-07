import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { Typography, Container } from '@mui/material';

const LandingPage: NextPage = () => {
  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography>Landing page</Typography>
      </Container>
    </Layout>
  );
};

export default LandingPage;

import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { Typography } from '@mui/material';

const HomePage: NextPage = () => {
  return (
    <Layout title="Home">
      <Typography>Home page</Typography>
    </Layout>
  );
};

export default HomePage;

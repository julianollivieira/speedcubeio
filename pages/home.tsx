import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { Box, Typography } from '@mui/material';

const HomePage: NextPage = () => {
  return (
    <Layout title="Home" isApp>
      <Box
        sx={{
          pt: '64px',
          px: { md: '240px' },
        }}
      >
        <Box sx={{ px: 2 }}>
          <Typography>Home page</Typography>
        </Box>
      </Box>
    </Layout>
  );
};

export default HomePage;

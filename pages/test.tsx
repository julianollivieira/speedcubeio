import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { Box } from '@mui/material';
import BoxList from '@/components/BoxList';

const TestPage: NextPage = () => {
  return (
    <Layout title="Home" isApp>
      <Box
        sx={{
          pt: '64px',
          px: { md: '240px' },
        }}
      >
        <BoxList />
      </Box>
    </Layout>
  );
};

export default TestPage;

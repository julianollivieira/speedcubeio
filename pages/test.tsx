import type { NextPage } from 'next';
import { Box } from '@mui/material';
import BoxList from '@/components/BoxList';
import TimeList from '@/components/TimeList';
import Profile from '@/components/Profile';
import Layout from '@/components/layout/Layout';

const TestPage: NextPage = () => {
  return (
    <Layout isApp>
      <Box sx={{ display: 'flex', flexDirection: 'row', p: 20 }}>
        <Box></Box>
        <Box>
          <Box sx={{ display: 'flex' }}>
            <BoxList />
            <TimeList />
            <Profile />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default TestPage;

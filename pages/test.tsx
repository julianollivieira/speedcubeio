import type { NextPage } from 'next';
import { Box } from '@mui/material';
import BoxList from '@/components/BoxList';
import SocialList from '@/components/SocialList';
import TimeList from '@/components/TimeList';
import Layout from '@/components/layout/Layout';
import { BoxProvider } from '@/hooks/useBoxes';
import { ProfileProvider } from '@/hooks/useProfile';

const TestPage: NextPage = () => {
  return (
    <Layout>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box>
          <ProfileProvider>
            <SocialList />
          </ProfileProvider>
        </Box>
        <Box>
          <BoxProvider>
            <Box sx={{ display: 'flex' }}>
              <BoxList />
              <TimeList />
            </Box>
          </BoxProvider>
        </Box>
      </Box>
    </Layout>
  );
};

export default TestPage;

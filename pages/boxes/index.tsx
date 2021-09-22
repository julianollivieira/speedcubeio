import type { NextPage } from 'next';
import { Box, Divider } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { AllInbox as AllInboxIcon } from '@mui/icons-material';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/misc/PageHeader';
import BoxGrid from '@/components/boxes/grid/BoxGrid';

const BoxesPage: NextPage = () => {
  const { user } = useAuth();

  return (
    <Layout title="Boxes" isApp>
      <Box
        sx={{
          pt: '64px',
          px: { md: '240px' },
        }}
      >
        <Box sx={{ px: 2 }}>
          <PageHeader title="Your boxes" icon={AllInboxIcon} />
          <Divider sx={{ mb: 3 }} />
          <BoxGrid user={user} showControls={true} />
        </Box>
      </Box>
    </Layout>
  );
};

export default BoxesPage;

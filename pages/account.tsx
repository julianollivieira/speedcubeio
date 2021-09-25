import type { NextPage } from 'next';
import Layout from '@/components/layout/Layout';
import { Box, Divider } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import PageHeader from '@/components/misc/PageHeader';
import AccountSettings from '@/components/account/AccountSettings';

const AccountPage: NextPage = () => {
  return (
    <Layout title="Account & Settings"
      isApp>
      <Box
        sx={{
          pt: '64px',
          px: { md: '240px' },
        }}
      >
        <Box sx={{ px: 2 }}>
          <PageHeader title="Account & Settings"
            icon={SettingsIcon} />
          <Divider sx={{ mb: 3 }} />
          <AccountSettings />
        </Box>
      </Box>
    </Layout>
  );
};

export default AccountPage;

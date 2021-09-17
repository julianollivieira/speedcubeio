import type { NextPage } from 'next';
import { ReactElement } from 'react';
import { Divider } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import PageHeader from '@/components/general/PageHeader';
import UserLayout from '@/components/layout/UserLayout';
import AccountSettings from '@/components/account/AccountSettings';

const PreferencesPage: NextPage = (): ReactElement => {
  return (
    <UserLayout
      title="Account & Settings"
      sx={{
        pt: '64px',
        pl: { xs: 0, md: '240px' },
        pr: { xs: 0, md: '240px' },
      }}
    >
      <PageHeader title="Account & Settings" icon={SettingsIcon} />
      <Divider sx={{ my: 3 }} />
      <AccountSettings />
    </UserLayout>
  );
};

export default PreferencesPage;

import type { NextPage } from 'next';
import { ReactElement } from 'react';
import { Box, Typography, Divider } from '@material-ui/core';
import UserLayout from '@/components/layout/UserLayout';
import Preferences from '@/components/preferences/Preferences';

const PreferencesPage: NextPage = (): ReactElement => {
  return (
    <UserLayout
      title="Preferences"
      sx={{
        pt: '64px',
        pl: { xs: 0, md: '240px' },
        pr: { xs: 0, md: '240px' },
      }}
    >
      <Typography variant="h3">Preferences</Typography>
      <Divider sx={{ my: 3 }} />
      <Preferences />
    </UserLayout>
  );
};

export default PreferencesPage;

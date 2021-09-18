import { useAuth } from '@/utils/auth';
import type { NextPage } from 'next';
import { ReactElement } from 'react';
import { Divider } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import PageHeader from '@/components/general/PageHeader';
import UserLayout from '@/components/layout/UserLayout';
import { getDaypart } from '@/utils/time';

const Home: NextPage = (): ReactElement => {
  const { currentUser } = useAuth();

  return (
    <UserLayout
      title="Home"
      sx={{
        mt: '64px',
        pl: { xs: 0, md: '240px' },
        pr: { xs: 0, md: '240px' },
        height: 'calc(100vh - 64px)',
        overflowY: 'scroll',
      }}
    >
      <PageHeader
        title={`Good${getDaypart()} , ${currentUser?.displayName}`}
        icon={HomeIcon}
      />
      <Divider sx={{ my: 3 }} />
    </UserLayout>
  );
};

export default Home;
